import { CONFIG_APP } from '../config'
import { requisitarJson } from './http'

/**
 * CRUD dos relatos na API externa (json-server local ou MockAPI na nuvem).
 * Os dois seguem o mesmo padrão REST: /relatos e /relatos/:id
 */
const URL_RELATOS = `${CONFIG_APP.apiUrl}/relatos`

export function listarRelatos() {
  return requisitarJson(URL_RELATOS)
}

export function criarRelato(relato) {
  return requisitarJson(URL_RELATOS, { metodo: 'POST', corpo: relato })
}

export function atualizarRelato(relato) {
  return requisitarJson(`${URL_RELATOS}/${encodeURIComponent(relato.id)}`, { metodo: 'PUT', corpo: relato })
}

export function removerRelato(id) {
  return requisitarJson(`${URL_RELATOS}/${encodeURIComponent(id)}`, { metodo: 'DELETE' })
}
