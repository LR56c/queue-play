import {
  PrismaBranchData
}                       from "~~/core/modules/branch/infrastructure/prisma_branch_data"
import prisma           from "~~/lib/prisma"
import { AddBranch }    from "~~/core/modules/branch/application/add_branch"
import { RemoveBranch } from "~~/core/modules/branch/application/remove_branch"
import { UpdateBranch } from "~~/core/modules/branch/application/update_branch"
import { SearchBranch } from "~~/core/modules/branch/application/search_branch"
import {
  PrismaBannedSongData
}                       from "~~/core/modules/banned_song/infrastructure/prisma_banned_song_data"
import {
  AddBannedSong
}                       from "~~/core/modules/banned_song/application/add_banned_song"
import {
  RemoveBannedSong
}                       from "~~/core/modules/banned_song/application/remove_banned_song"
import {
  UpdateBannedSong
}                       from "~~/core/modules/banned_song/application/update_banned_song"
import {
  SearchBannedSong
}                       from "~~/core/modules/banned_song/application/search_banned_song"
import {
  PrismaOnGoingSongData
}                       from "~~/core/modules/on_going_song/infrastructure/prisma_on_going_song_data"
import {
  AddSong
}                       from "~~/core/modules/on_going_song/application/add_song"
import {
  RemoveSongsBullk
}                       from "~~/core/modules/on_going_song/application/remove_songs_bullk"
import {
  UpdateSongsBulk
}                       from "~~/core/modules/on_going_song/application/update_songs_bulk"
import {
  SearchSongs
}                       from "~~/core/modules/on_going_song/application/search_songs"

const branchDao    = new PrismaBranchData( prisma )
const addBranch    = new AddBranch( branchDao )
const removeBranch = new RemoveBranch( branchDao )
const updateBranch = new UpdateBranch( branchDao )
const searchBranch = new SearchBranch( branchDao )

const bannedSongDao    = new PrismaBannedSongData( prisma )
const addBannedSong    = new AddBannedSong( bannedSongDao )
const removeBannedSong = new RemoveBannedSong( bannedSongDao )
const updateBannedSong = new UpdateBannedSong( bannedSongDao )
const searchBannedSong = new SearchBannedSong( bannedSongDao )

const onGoingSongDao    = new PrismaOnGoingSongData( prisma )
const addOnGoingSong    = new AddSong( onGoingSongDao )
const removeOnGoingSong = new RemoveSongsBullk( onGoingSongDao )
const updateOnGoingSong = new UpdateSongsBulk( onGoingSongDao )
const searchOnGoingSong = new SearchSongs( onGoingSongDao )
