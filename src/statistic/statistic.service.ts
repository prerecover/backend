import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { StatsOutput } from './dto/main';
import { UsersStats } from './dto/users-stats';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) { }

  // async getUserStats(chunk: number): Promise<UsersStats> {
  //     const totalCreatedUsers = await this.userRepository.count();
  //     return {};
  // }
  //
  // async siteWork(chunk: number): Promise<StatsOutput> { }
}
