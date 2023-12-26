import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { IsNumber, IsString, validateOrReject } from 'class-validator';

class CalculateBirthYearDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}

@Controller('year')
export class YearController {
  @Post()
  async calculateBirthYear(@Body() body: CalculateBirthYearDto): Promise<any> {
    try {
      await validateOrReject(body);

      const birthYear: number = this.getBirthYear(body.age);
      /// make delay for 2 seconds to simulate a long process thin time out will be thrown 
      await new Promise((resolve) => setTimeout(resolve, 2));
      return {
        name: body.name,
        birthYear,
      };
    } catch (error) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
  }

  private getBirthYear(age: number): number {
    const year = new Date().getFullYear() - age;
    if (year < 0) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return year;
  }
}
