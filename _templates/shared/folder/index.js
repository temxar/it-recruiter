module.exports = {
  prompt: async ({ inquirer }) => {
    const { folder } = await inquirer.prompt({
      type: 'input',
      name: 'folder',
      message: 'Enter a folder name',
    })
    if (!folder) throw new Error('Folder name is required!')
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter a component name',
    })
    if (!name) throw new Error();
    return {
      src: `src/components/shared/${folder}/${name}`,
      name,
      folder
    }
  },
}
