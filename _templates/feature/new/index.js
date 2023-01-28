module.exports = {
  prompt: async ({ inquirer }) => {
    const { pageName } = await inquirer.prompt({
      type: 'input',
      name: 'pageName',
      message: 'Enter a page name',
    })
    if (!pageName) throw new Error('Page name is required!')
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter a component name',
    })
    if (!name) throw new Error();
    return {
      src: `src/components/features/${pageName}/${name}`,
      name,
      pageName
    }
  },
}
