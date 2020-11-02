import { NBA, MLB } from '../const'

export async function getRelationship(object, relationship) {
  const linkObject = object.relationships[relationship]
  const link = linkObject.links.related
  const response = await this.get(link)
  return response.data
}

export function buildNbaModel({
  model: { data: modelData },
  stat: { data: statData },
}) {
  const dataModel = {
    ...modelData.attributes,
    stat: statData.attributes,
  }
  return addCacheMetadata(dataModel, { sport: NBA })
}

export function buildMlbModel({
  model: { data: modelData },
  batting: { data: battingData },
  pitching: { data: pitchingData },
}) {
  const dataModel = {
    ...modelData.attributes,
    stat: {
      batting: battingData ? battingData.attributes : null,
      pitching: pitchingData ? pitchingData.attributes : null,
    },
  }
  return addCacheMetadata(dataModel, { sport: MLB })
}

export const addCacheMetadata = (data, { sport }) => {
  if (Array.isArray(data)) {
    return data.map(resource => ({ sport, ...resource }))
  } else {
    return {
      ...data,
      sport,
    }
  }
}
