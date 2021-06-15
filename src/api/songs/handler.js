const ClientError = require('../../exceptions/ClientError');
const {
  successResponseWithMessageAndData,
  failedResponseWithMessage,
  errorResponseWithMessage,
  successResponseWithMessage,
} = require('../../utils/handler-response');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title = 'untitled', year, performer, genre, duration,
      } = request.payload;
      const songId = await this._service.addSong({
        title, year, performer, genre, duration,
      });

      return successResponseWithMessageAndData(h, 'Lagu berhasil ditambahkan', { songId }, 201);
    } catch (error) {
      if (error instanceof ClientError) {
        return failedResponseWithMessage(h, error.message, error.statusCode);
      }

      return errorResponseWithMessage(h, 'Maaf terjadi kesalahan pada server.', 500);
    }
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return failedResponseWithMessage(h, error.message, error.statusCode);
      }

      return errorResponseWithMessage(h, 'Maaf terjadi kesalahan pada server.', 500);
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params;
      await this._service.editSongById(id, request.payload);

      return successResponseWithMessage(h, 'Lagu berhasil diperbarui', 200);
    } catch (error) {
      if (error instanceof ClientError) {
        return failedResponseWithMessage(h, error.message, error.statusCode);
      }

      return errorResponseWithMessage(h, 'Maaf terjadi kesalahan pada server', 500);
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);

      return successResponseWithMessage(h, 'Lagu berhasil diahapus', 200);
    } catch (error) {
      if (error instanceof ClientError) {
        return failedResponseWithMessage(h, error.message, error.statusCode);
      }

      return errorResponseWithMessage(h, 'Maaf terjadi kesalahan pada server', 500);
    }
  }
}

module.exports = SongsHandler;
