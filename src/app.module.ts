import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//
import { BrandsModule } from './routes/brands/brands.module';
import { ModelsModule } from './routes/models/models.module';
import { PlansModule } from './routes/plans/plans.module';
import { PaymentTypesModule } from './routes/payment-types/payment-types.module';
import { LocationsModule } from './routes/locations/locations.module';
import { SubscriptionsModule } from './routes/subscriptions/subscriptions.module';
import { EnvModule } from './modules/env/env.module';

@Module({
  imports: [BrandsModule, ModelsModule, PlansModule, PaymentTypesModule, LocationsModule, SubscriptionsModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
