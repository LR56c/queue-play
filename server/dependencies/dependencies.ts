import {
  PrismaBranchData
} from "~~/core/modules/branch/infrastructure/prisma_branch_data"
import prisma from "~~/lib/prisma"
import { AddBranch } from "~~/core/modules/branch/application/add_branch"
import { RemoveBranch } from "~~/core/modules/branch/application/remove_branch"
import { UpdateBranch } from "~~/core/modules/branch/application/update_branch"
import { SearchBranch } from "~~/core/modules/branch/application/search_branch"
import {
  PrismaBannedSongData
} from "~~/core/modules/banned_song/infrastructure/prisma_banned_song_data"
import {
  AddBannedSong
} from "~~/core/modules/banned_song/application/add_banned_song"
import {
  RemoveBannedSong
} from "~~/core/modules/banned_song/application/remove_banned_song"
import {
  UpdateBannedSong
} from "~~/core/modules/banned_song/application/update_banned_song"
import {
  SearchBannedSong
} from "~~/core/modules/banned_song/application/search_banned_song"

const branchDao = new PrismaBranchData(prisma)
const addBranch = new AddBranch(branchDao)
const removeBranch = new RemoveBranch(branchDao)
const updateBranch = new UpdateBranch(branchDao)
const searchBranch = new SearchBranch(branchDao)

const bannedSong = new PrismaBannedSongData(prisma)
const addBannedSong = new AddBannedSong(bannedSong)
const removeBannedSong = new RemoveBannedSong(bannedSong)
const updateBannedSong = new UpdateBannedSong(bannedSong)
const searchBannedSong = new SearchBannedSong(bannedSong)
