import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 
import { BrandsModule } from './routes/brands/brands.module';
import { ModelsModule } from './routes/models/models.module';
import { PlansModule } from './routes/plans/plans.module';
import { SubscriptionsModule } from './routes/subscriptions/subscriptions.module';

@Module({
  imports: [BrandsModule, ModelsModule, PlansModule, SubscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
