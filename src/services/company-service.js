/**
 * @brief Conecta al repositorio "companyRepository"
 */
const companyRepository = require('../repositories/company-repository');
/**
 * @brief Conecta al repositorio "companyRepository"
 * @returns 
 */
const findCompanies = async () => companyRepository.findCompanies();
/**
 * @brief Conecta con el repositorio "companyRepository. findOneCompany"
 * @returns 
 */
const findOneCompany = async (companyId) =>
  companyRepository.findOneCompany(companyId);
/**
 * @brief Conecta con el repositorio "companyRepository.createNewCompany"
 * @returns 
 */
const createNewCompany = async (newCompany) =>
  companyRepository.createNewCompany(newCompany);
/**
 * @brief Conecta con el repositorio "companyRepository.updateCompany"
 * @returns 
 */
const updateCompany = async (objectCompany, companyId) =>
  companyRepository.updateCompany(objectCompany, companyId);
/**
 * @brief Conecta con el repositorio "companyRepository.deleteCompany"
 * @returns 
 */
const deleteCompany = async (companyId) =>
  companyRepository.deleteCompany(companyId);

module.exports = {
  findCompanies,
  findOneCompany,
  createNewCompany,
  updateCompany,
  deleteCompany,
};
