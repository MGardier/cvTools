import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserTokenService } from '../user-token/user-token.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { UserRoles, UserStatus, User, UserToken } from '@prisma/client';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserTokenGenerateOutputInterface } from 'src/user-token/interfaces/generate/user-token-generate-output.interface';

jest.mock('bcrypt');
jest.mock('uuid');

describe('AuthService', () => {
  // SETUP
  let service: AuthService;
  let mockUserService: jest.Mocked<UserService>;
  let mockUserTokenService: jest.Mocked<UserTokenService>;
  let mockEmailService: jest.Mocked<EmailService>;
  let mockLogger: jest.Mocked<Logger>;

  const mockSignUpDto: SignUpDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockHashedPassword = 'hashedPassword123';

  const mockCreatedUser: User = {
    id: 1,
    email: 'test@example.com',
    password: mockHashedPassword,
    roles: UserRoles.USER,
    status: UserStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserToken: UserTokenGenerateOutputInterface = { token: 'token' };

  const mockUuid = 'test-uuid-123';
  const mockConfirmationUrl = 'http://localhost:3000/confirm';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOneByEmail: jest.fn(),
            findOneById: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: UserTokenService,
          useValue: {
            generate: jest.fn(),
            createAccessAndRefreshToken: jest.fn(),
            decodeRefreshToken: jest.fn(),
            decodeConfirmAccountToken: jest.fn(),
            createForgotPasswordToken: jest.fn(),
            decodeForgotPasswordToken: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendAccountConfirmationLink: jest.fn(),
            sendResetPasswordLink: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(
              (key: 'FRONT_URL_CONFIRMATION_ACCOUNT' | 'HASH_SALT_ROUND') => {
                const envKeys = {
                  FRONT_URL_CONFIRMATION_ACCOUNT:
                    'http://localhost:3000/confirm',
                  HASH_SALT_ROUND: 12,
                };
                if (!envKeys[key])
                  throw new Error(`Key : ${key} for env variable wasn't mock `);
                return envKeys[key];
              },
            ),
          },
        },
      ],
      imports: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
    mockUserService = module.get(UserService);
    mockUserTokenService = module.get(UserTokenService);
    mockEmailService = module.get(EmailService);

    (bcrypt.hash as jest.Mock) = jest.fn();
    (uuidv4 as jest.Mock) = jest.fn();

    // Mock du logger pour éviter les logs en test
    mockLogger = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    } as any;

    // Injection du mock logger
    (service as any).logger = mockLogger;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ HAPPY PATH TESTS
  describe('🎯 Happy Path Scenarios', () => {
    describe('signUp', () => {
      it('should successfully create user with confirmation email', async () => {
        // 🎯 ARRANGE: Setup test data and mocks
        (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        mockUserService.create.mockResolvedValue(mockCreatedUser);
        mockUserTokenService.generate.mockResolvedValue(mockUserToken);
        mockEmailService.sendAccountConfirmationLink.mockResolvedValue(true);

        // 🚀 ACT: Execute the signUp function
        const result = await service.signUp(mockSignUpDto);

        // ✅ ASSERT: Verify all expectations
        // 1. Password should be hashed correctly
        expect(bcrypt.hash).toHaveBeenCalledWith(mockSignUpDto.password, 12);

        // 2. User should be created with proper data
        expect(mockUserService.create).toHaveBeenCalledWith({
          ...mockSignUpDto,
          password: mockHashedPassword,
          roles: UserRoles.USER,
          status: UserStatus.PENDING,
        });

        // 3. UUID should be generated
        expect(uuidv4).toHaveBeenCalled();

        // 4. Token should be generated with correct payload
        expect(mockUserTokenService.generate).toHaveBeenCalledWith({
          payload: {
            sub: mockCreatedUser.id,
            email: mockCreatedUser.email,
            uuid: mockUuid,
          },
          expiresKey: 'CONFIRMATION_ACCOUNT',
          secretKey: 'DEFAULT',
        });

        // 5. Confirmation email should be sent
        expect(
          mockEmailService.sendAccountConfirmationLink,
        ).toHaveBeenCalledWith(
          mockSignUpDto.email,
          `${mockConfirmationUrl}/${mockUuid}`,
        );

        // 6. Should return user data (without sensitive info)
        expect(result).toEqual(mockCreatedUser);
      });

      it('should use default salt round when config is not available', async () => {
        // 🎯 ARRANGE: Config returns undefined for salt round
        (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        mockUserService.create.mockResolvedValue(mockCreatedUser);
        mockUserTokenService.generate.mockResolvedValue(mockUserToken);
        mockEmailService.sendAccountConfirmationLink.mockResolvedValue(
          undefined,
        );

        // 🚀 ACT: Execute signUp
        await service.signUp(mockSignUpDto);

        // ✅ ASSERT: Should use default value 12
        expect(bcrypt.hash).toHaveBeenCalledWith(mockSignUpDto.password, 12);
      });
    });
  });

  // ⚠️ ERROR SCENARIOS
  describe('🚨 Error Handling', () => {
    describe('signUp error scenarios', () => {
      it('should throw InternalServerErrorException when password hashing fails', async () => {
        // 🎯 ARRANGE: Make bcrypt.hash throw an error
        const hashError = new Error('Bcrypt hashing failed');
        (bcrypt.hash as jest.Mock).mockRejectedValue(hashError);

        // 🚀 ACT & ✅ ASSERT: Should throw InternalServerErrorException
        await expect(service.signUp(mockSignUpDto)).rejects.toThrow(
          InternalServerErrorException,
        );
        await expect(service.signUp(mockSignUpDto)).rejects.toThrow(
          'Hash password failed unexpectedly in SignUp',
        );

        // User creation should not be called if hashing fails
        expect(mockUserService.create).not.toHaveBeenCalled();
      });

      it('should continue execution but log error when token generation fails', async () => {
        // 🎯 ARRANGE: Token generation fails
        (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        mockUserService.create.mockResolvedValue(mockCreatedUser);
        const tokenError = new Error('Token generation failed');
        mockUserTokenService.generate.mockRejectedValue(tokenError);

        // 🚀 ACT: Execute signUp
        const result = await service.signUp(mockSignUpDto);

        // ✅ ASSERT: Should still return user but log error
        expect(result).toEqual(mockCreatedUser);
        expect(mockLogger.error).toHaveBeenCalledWith(
          'Generate Token failed : ',
          expect.objectContaining({
            operation: 'signUp',
            step: 'token_generation',
            error: tokenError.message,
            payload: {
              sub: mockCreatedUser.id,
              email: mockCreatedUser.email,
              uuid: mockUuid,
            },
          }),
        );

        // Email should not be sent if token generation fails
        expect(
          mockEmailService.sendAccountConfirmationLink,
        ).not.toHaveBeenCalled();
      });

      it('should continue execution but log error when email sending fails', async () => {
        // 🎯 ARRANGE: Email sending fails but token generation succeeds
        (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        mockUserService.create.mockResolvedValue(mockCreatedUser);
        mockUserTokenService.generate.mockResolvedValue(mockUserToken);
        const emailError = new Error('Email sending failed');
        mockEmailService.sendAccountConfirmationLink.mockRejectedValue(
          emailError,
        );

        // 🚀 ACT: Execute signUp
        const result = await service.signUp(mockSignUpDto);

        // ✅ ASSERT: Should still return user but log error
        expect(result).toEqual(mockCreatedUser);
        expect(mockLogger.error).toHaveBeenCalledWith(
          'Sending email failed : ',
          expect.objectContaining({
            operation: 'signUp',
            step: 'sending_confirmation_email',
            error: emailError.message,
            confirmationLink: `${mockConfirmationUrl}/${mockUuid}`,
            email: mockSignUpDto.email,
          }),
        );
      });
    });
  });

  // 🔧 EDGE CASES
  describe('🔍 Edge Cases', () => {
    describe('signUp edge cases', () => {
      it('should handle both token generation and email sending failures', async () => {
        // 🎯 ARRANGE: Both operations fail
        (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        mockUserService.create.mockResolvedValue(mockCreatedUser);
        mockUserTokenService.generate.mockRejectedValue(
          new Error('Token failed'),
        );
        mockEmailService.sendAccountConfirmationLink.mockRejectedValue(
          new Error('Email failed'),
        );

        // 🚀 ACT: Execute signUp
        const result = await service.signUp(mockSignUpDto);

        // ✅ ASSERT: Should log token error but not email error (since email is skipped when token fails)
        expect(mockLogger.error).toHaveBeenCalledTimes(1);
        expect(mockLogger.error).toHaveBeenCalledWith(
          'Generate Token failed : ',
          expect.any(Object),
        );
        expect(result).toEqual(mockCreatedUser);
      });
    });

    describe('Private methods edge cases', () => {
      it('should generate unique UUID each time', () => {
        // 🎯 ARRANGE: Mock different UUIDs
        (uuidv4 as jest.Mock)
          .mockReturnValueOnce('uuid-1')
          .mockReturnValueOnce('uuid-2');

        // 🚀 ACT: Call private method via reflection
        const uuid1 = (service as any).__createUuid();
        const uuid2 = (service as any).__createUuid();

        // ✅ ASSERT: Should generate different UUIDs
        expect(uuid1).toBe('uuid-1');
        expect(uuid2).toBe('uuid-2');
        expect(uuidv4).toHaveBeenCalledTimes(2);
      });
    });
  });

  // 🔄 INTERACTION TESTS
  describe('🔄 Service Integration Flow', () => {
    it('should execute signUp operations in correct order', async () => {
      // 🎯 ARRANGE: Setup all mocks
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
      (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

      mockUserService.create.mockResolvedValue(mockCreatedUser);
      mockUserTokenService.generate.mockResolvedValue(mockUserToken);
      mockEmailService.sendAccountConfirmationLink.mockResolvedValue(undefined);

      // 🚀 ACT: Execute signUp
      await service.signUp(mockSignUpDto);

      // ✅ ASSERT: Verify execution order using call order
      const mockCalls = [
        ['bcrypt.hash', bcrypt.hash],
        ['userService.create', mockUserService.create],
        ['uuidv4', uuidv4],
        ['tokenService.generate', mockUserTokenService.generate],
        [
          'emailService.sendAccountConfirmationLink',
          mockEmailService.sendAccountConfirmationLink,
        ],
      ];

      // Verify all mocks were called
      mockCalls.forEach(([name, mockFn]) => {
        expect(mockFn).toHaveBeenCalled();
      });
    });
  });
});
