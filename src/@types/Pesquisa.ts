export interface PesquisaQuery {
  [key: string]: | string | string[] | PesquisaQuery | PesquisaQuery[]
}
