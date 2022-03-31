import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
