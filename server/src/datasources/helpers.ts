import { NBA, MLB } from '../const'

export const addNbaCacheMetadata = data => addCacheMetadata(data, NBA)
export const addMlbCacheMetadata = data => addCacheMetadata(data, MLB)

export const addCacheMetadata = (data, sport) => ({
  ...data,
  sport,
})
