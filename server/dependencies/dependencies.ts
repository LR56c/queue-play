import {
  PrismaBranchData
}                            from "~~/core/modules/branch/infrastructure/prisma_branch_data"
import prisma                from "~~/lib/prisma"
import {
  AddBranch
}                            from "~~/core/modules/branch/application/add_branch"
import {
  RemoveBranch
}                            from "~~/core/modules/branch/application/remove_branch"
import {
  UpdateBranch
}                            from "~~/core/modules/branch/application/update_branch"
import {
  SearchBranch
}                            from "~~/core/modules/branch/application/search_branch"
import {
  PrismaBannedSongData
}                            from "~~/core/modules/banned_song/infrastructure/prisma_banned_song_data"
import {
  AddBannedSong
}                            from "~~/core/modules/banned_song/application/add_banned_song"
import {
  RemoveBannedSong
}                            from "~~/core/modules/banned_song/application/remove_banned_song"
import {
  UpdateBannedSong
}                            from "~~/core/modules/banned_song/application/update_banned_song"
import {
  SearchBannedSong
}                            from "~~/core/modules/banned_song/application/search_banned_song"
import {
  PrismaOnGoingSongData
}                            from "~~/core/modules/on_going_song/infrastructure/prisma_on_going_song_data"
import {
  AddSong
}                            from "~~/core/modules/on_going_song/application/add_song"
import {
  RemoveSongsBullk
}                            from "~~/core/modules/on_going_song/application/remove_songs_bullk"
import {
  UpdateSongsBulk
}                            from "~~/core/modules/on_going_song/application/update_songs_bulk"
import {
  SearchSongs
}                            from "~~/core/modules/on_going_song/application/search_songs"
import {
  PrismaPlaylistData
}                            from "~~/core/modules/playlist/infrastructure/prisma_playlist_data"
import {
  AddPlaylist
}                            from "~~/core/modules/playlist/application/add_playlist"
import {
  RemovePlaylist
}                            from "~~/core/modules/playlist/application/remove_playlist"
import {
  UpdatePlaylist
}                            from "~~/core/modules/playlist/application/update_playlist"
import {
  SearchPlaylist
}                            from "~~/core/modules/playlist/application/search_playlist"
import {
  PrismaSchedulePlaylistData
}                            from "~~/core/modules/schedule_playlist/infrastructure/prisma_schedule_playlist_data"
import {
  RemoveSchedulePlaylist
}                            from "~~/core/modules/schedule_playlist/application/remove_schedule_playlist"
import {
  UpdateSchedulePlaylist
}                            from "~~/core/modules/schedule_playlist/application/update_schedule_playlist"
import {
  SearchSchedulePlaylist
}                            from "~~/core/modules/schedule_playlist/application/search_schedule_playlist"
import {
  PrismaUserData
}                            from "~~/core/modules/user/infrastructure/prisma_user_data"
import { AddUser }           from "~~/core/modules/user/application/add_user"
import { RemoveUser }        from "~~/core/modules/user/application/remove_user"
import { UpdateUser }        from "~~/core/modules/user/application/update_user"
import { SearchUser }        from "~~/core/modules/user/application/search_user"
import { UserService }       from "~~/server/services/user_service"
import { SongService }       from "~~/server/services/song_service"
import { BannedSongService } from "~~/server/services/banned_song_service"
import { PlaylistService }   from "~~/server/services/playlist_service"
import {
  AddSchedulePlaylist
} from "~~/core/modules/schedule_playlist/application/add_schedule_playlist"
import { ScheduleService }   from "~~/server/services/schedule_service"
import { BranchService }     from "~~/server/services/branch_service"

const branchDao    = new PrismaBranchData( prisma )
const addBranch    = new AddBranch( branchDao )
const removeBranch = new RemoveBranch( branchDao )
const updateBranch = new UpdateBranch( branchDao )
const searchBranch = new SearchBranch( branchDao )
export const branchService = new BranchService(
  addBranch,
  searchBranch,
  removeBranch,
  updateBranch
)
const bannedSongDao            = new PrismaBannedSongData( prisma )
const addBannedSong            = new AddBannedSong( bannedSongDao )
const removeBannedSong         = new RemoveBannedSong( bannedSongDao )
const updateBannedSong         = new UpdateBannedSong( bannedSongDao )
const searchBannedSong         = new SearchBannedSong( bannedSongDao )
export const bannedSongService = new BannedSongService(
  addBannedSong,
  searchBannedSong,
  removeBannedSong,
  updateBannedSong
)
const onGoingSongDao           = new PrismaOnGoingSongData( prisma )
const addOnGoingSong           = new AddSong( onGoingSongDao )
const removeOnGoingSong        = new RemoveSongsBullk( onGoingSongDao )
const updateOnGoingSong        = new UpdateSongsBulk( onGoingSongDao )
const searchOnGoingSong        = new SearchSongs( onGoingSongDao )
export const songService       = new SongService(
  addOnGoingSong,
  searchOnGoingSong,
  removeOnGoingSong,
  updateOnGoingSong
)
const playlistDao              = new PrismaPlaylistData( prisma )
const addPlaylist              = new AddPlaylist( playlistDao,
  searchOnGoingSong )
const removePlaylist           = new RemovePlaylist( playlistDao )
const updatePlaylist           = new UpdatePlaylist( playlistDao,
  searchOnGoingSong )
const searchPlaylist           = new SearchPlaylist( playlistDao )
export const playlistService = new PlaylistService(
  addPlaylist,
  searchPlaylist,
  removePlaylist,
  updatePlaylist
)

const scheduleDao    = new PrismaSchedulePlaylistData( prisma )
const addSchedule    = new AddSchedulePlaylist( scheduleDao, searchPlaylist )
const removeSchedule = new RemoveSchedulePlaylist( scheduleDao )
const updateSchedule = new UpdateSchedulePlaylist( scheduleDao, searchPlaylist )
const searchSchedule = new SearchSchedulePlaylist( scheduleDao )
export const schedulePlaylistService = new ScheduleService(
  addSchedule,
  searchSchedule,
  removeSchedule,
  updateSchedule
)
const userDao            = new PrismaUserData( prisma )
const addUser            = new AddUser( userDao )
const removeUser         = new RemoveUser( userDao )
const updateUser         = new UpdateUser( userDao )
const searchUser         = new SearchUser( userDao )
export const userService = new UserService(
  addUser,
  searchUser,
  removeUser,
  updateUser
)
