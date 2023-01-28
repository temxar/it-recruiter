module.exports = {
  prompt: async ({ inquirer }) => {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter a page name',
    })
    if (!name) throw new Error()
    return {
      src: `src/pages/${name}`,
      name,
    }
  },
}
