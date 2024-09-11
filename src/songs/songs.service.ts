import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song, SongDocument } from './schemas/song.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from 'src/albums/schemas/album.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name)
    private readonly songModel: Model<SongDocument>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = await this.songModel.create(createSongDto);
    return song;
  }

  async findAll(): Promise<Song[]> {
    const songs = await this.songModel.find().populate('album', null, Album.name);
    return songs;
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songModel.findById(id);
    return song;
  }

  async update(id: string, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.songModel.findByIdAndUpdate(id, updateSongDto);
    return song;
  }

  async remove(id: string): Promise<Song> {
    const song = await this.songModel.findByIdAndDelete(id);
    return song;
  }
}
