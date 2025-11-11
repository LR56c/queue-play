import {
  PrismaBranchData
} from "~~/core/modules/branch/infrastructure/prisma_branch_data"
import prisma from "~~/lib/prisma"
import { AddBranch } from "~~/core/modules/branch/application/add_branch"
import { RemoveBranch } from "~~/core/modules/branch/application/remove_branch"
import { UpdateBranch } from "~~/core/modules/branch/application/update_branch"
import { SearchBranch } from "~~/core/modules/branch/application/search_branch"

const branchDao = new PrismaBranchData(prisma)
const addBranch = new AddBranch(branchDao)
const removeBranch = new RemoveBranch(branchDao)
const updateBranch = new UpdateBranch(branchDao)
const searchBranch = new SearchBranch(branchDao)