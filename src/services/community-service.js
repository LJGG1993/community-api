/**
 * @brief Conecta con la ruta
 * @returns 
 */
const communityRepository = require('../repositories/community-respository');
/**
 * @brief  Conecta con el repositorio "companyRepository.findCommunities"
 * @returns 
 */
const findCommunities = async () => communityRepository.findCommunities();
/**
 * @brief  Conecta con el repositorio "companyRepository.finOneCommpanity"
 * @returns 
 */
const findOneCommunity = async (communityId) =>
  communityRepository.findOneCommunity(communityId);
/**
 * @brief  Conecta con el repositorio "companyRepository.createNewCommunity"
 * @returns 
 */
const createNewCommunity = async (newCommunity) =>
  communityRepository.createNewCommunity(newCommunity);
/**
 * @brief  Conecta con el repositorio "companyRepository.updateCommunity"
 * @returns 
 */
const updateCommunity = async (objectCommunity, communityId) =>
  communityRepository.updateCommunity(objectCommunity, communityId);
/**
 * @brief  Conecta con el repositorio "companyRepository.deleteCommunity"
 * @returns 
 */
const deleteCommunity = async (communityId) =>
  communityRepository.deleteCommunity(communityId);

module.exports = {
  findCommunities,
  findOneCommunity,
  createNewCommunity,
  updateCommunity,
  deleteCommunity,
};
