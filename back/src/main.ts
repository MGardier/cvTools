import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { PrismaClientExceptionFilter } from './filters/prismaException.filter';

//TODO: A faire  - Implémenter la logique de repository 
//TODO: A faire  - Améliore le typage
//TODO: A faire  - S'occuper du rate limiter et vérifier le probléme avec le rate limiter
//TODO: A faire  - Doc + swagger
//TODO: A faire  - Test unitaire intégration + e2e à mettre en place


//TODO: A faire  - Corriger la partie jwt token

//TODO: A faire  - Implémenter toute la logique admin et son rôle
//TODO: A faire  - Ajouter une regex pour le password qui vérifie qu'il contient 1 lettre min et maj , un chiffre, un symbol 
//TODO: A faire  - Mettre en place une gestion des erreurs avec un filter
//TODO: A faire  - Ajouter les commentaires de lisibilité quand c'est nécessaire
//TODO: A faire  - Mettre en place un intercepteur pour le format des données retournées


//TODO: Idée AVoir une  boite mail qui trier pour moi selon certains critéres les offres de pe , helloworks, indee via leur api 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
