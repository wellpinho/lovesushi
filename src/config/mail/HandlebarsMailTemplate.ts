import handlebars from 'handlebars'
import fs from 'fs'

interface ITemplateVariable {
  [key: string]: string | number
}

interface IParserMailTemplate {
  file: string
  variables: ITemplateVariable
}

export default class HandlebarsMailTemplate {
  public async parser({ file, variables }: IParserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })

    // monta o template
    const parseTemplate = handlebars.compile(templateFileContent)

    // envia as variavéis no template
    return parseTemplate(variables)
  }
}
