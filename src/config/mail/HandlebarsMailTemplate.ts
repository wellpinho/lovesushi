import handlebars from 'handlebars'

interface ITemplateVariable {
  [key: string]: string | number
}

interface IParserMailTemplate {
  template: string
  variables: ITemplateVariable
}

export default class HandlebarsMailTemplate {
  public async parser({ template, variables }: IParserMailTemplate): Promise<string> {
    // monta o template
    const parseTemplate = handlebars.compile(template)

    // envia as variavéis no template
    return parseTemplate(variables)
  }
}
