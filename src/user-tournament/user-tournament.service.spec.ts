import { Test, TestingModule } from '@nestjs/testing';
import { UserTournamentService } from './user-tournament.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTournament } from './entities/user-tournament.entity';
import { TournamentService } from '../tournament/tournament.service';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserTournamentDto } from './dto/create-user-tournament.dto';
import { UpdateUserTournamentDto } from './dto/update-user-tournament.dto';

describe('UserTournamentService', () => {
  let service: UserTournamentService;
  let userTournamentRepository: Repository<UserTournament>;
  let userService: UserService;
  let tournamentService: TournamentService;

  const mockUserTournamentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockUserService = {
    findUserById: jest.fn(),
  };

  const mockTournamentService = {
    findTournamentById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTournamentService,
        {
          provide: getRepositoryToken(UserTournament),
          useValue: mockUserTournamentRepository,
        },
        { provide: UserService, useValue: mockUserService },
        { provide: TournamentService, useValue: mockTournamentService },
      ],
    }).compile();

    service = module.get<UserTournamentService>(UserTournamentService);
    userTournamentRepository = module.get<Repository<UserTournament>>(getRepositoryToken(UserTournament));
    userService = module.get<UserService>(UserService);
    tournamentService = module.get<TournamentService>(TournamentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserTournament', () => {
    it('should throw an error if tournament is not found', async () => {
      mockTournamentService.findTournamentById.mockResolvedValue(null);

      const createUserTournamentDto: CreateUserTournamentDto = { userId: '1', tournamentId: '1' };

      await expect(service.createUserTournament(createUserTournamentDto))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw an error if user is not found', async () => {
      mockTournamentService.findTournamentById.mockResolvedValue({});
      mockUserService.findUserById.mockResolvedValue(null);

      const createUserTournamentDto: CreateUserTournamentDto = { userId: '1', tournamentId: '1' };

      await expect(service.createUserTournament(createUserTournamentDto))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should create and save a UserTournament entity', async () => {
      mockTournamentService.findTournamentById.mockResolvedValue({});
      mockUserService.findUserById.mockResolvedValue({});
      mockUserTournamentRepository.create.mockReturnValue({ id: '1', userId: '1', tournamentId: '1' });
      mockUserTournamentRepository.save.mockResolvedValue({ id: '1', userId: '1', tournamentId: '1' });

      const createUserTournamentDto: CreateUserTournamentDto = { userId: '1', tournamentId: '1' };

      const result = await service.createUserTournament(createUserTournamentDto);

      expect(mockUserTournamentRepository.create).toHaveBeenCalledWith(createUserTournamentDto);
      expect(mockUserTournamentRepository.save).toHaveBeenCalledWith({ id: '1', userId: '1', tournamentId: '1' });
      expect(result).toEqual({ id: '1', userId: '1', tournamentId: '1' });
    });
  });

  describe('updateUserTournament', () => {
    it('should throw an error if user is not found', async () => {
      mockUserService.findUserById.mockResolvedValue(null);

      const updateUserTournamentDto: UpdateUserTournamentDto = { userId: '1', points: 10 };

      await expect(service.updateUserTournament('1', updateUserTournamentDto))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should update and return updated UserTournament entity', async () => {
      mockUserService.findUserById.mockResolvedValue({});
      mockUserTournamentRepository.findOne.mockResolvedValue({ id: '1', points: 10 });

      const updateUserTournamentDto: UpdateUserTournamentDto = { userId: '1', points: 10 };

      const result = await service.updateUserTournament('1', updateUserTournamentDto);

      expect(mockUserTournamentRepository.update).toHaveBeenCalledWith('1', { points: 10 });
      expect(result).toEqual({ id: '1', points: 10 });
    });
  });

  describe('findRanking', () => {
    it('should return the ranking ordered by points in descending order', async () => {
      const mockRanking = [
        { id: '1', points: 20 },
        { id: '2', points: 10 },
      ];

      mockUserTournamentRepository.find.mockResolvedValue(mockRanking);

      const result = await service.findRanking('1');

      expect(mockUserTournamentRepository.find).toHaveBeenCalledWith({
        where: { tournamentId: '1' },
        order: { points: 'DESC' },
      });

      expect(result).toEqual(mockRanking);
    });
  });
});
