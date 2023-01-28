module.exports = {
  prompt: async ({ inquirer }) => {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter a component name',
    })
    if (!name) throw new Error('Name is required!')
    return {
      src: `src/components/template/${name}`,
      name,
    }
  },
}
