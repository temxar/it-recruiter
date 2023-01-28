import { DeveloperCellAvailable } from 'components/features/crm/developers/DevelopersList/cells/DeveloperCellAvailable'
import { DeveloperCellGrade } from 'components/features/crm/developers/DevelopersList/cells/DeveloperCellGrade'
import { DeveloperCellRate } from 'components/features/crm/developers/DevelopersList/cells/DeveloperCellRate'
import { DeveloperCellStacks } from 'components/features/crm/developers/DevelopersList/cells/DeveloperCellStacks'
import { DeveloperCellStatus } from 'components/features/crm/developers/DevelopersList/cells/DeveloperCellStatus'
import { MuiColumn } from 'interfaces/common.interfaces'

export enum DevelopersColumns {
 ...
}

export const developersColumns: readonly MuiColumn<DevelopersColumns>[] = [
  ...
]

export const developerFreezeStatusCode = 'FREEZE'
