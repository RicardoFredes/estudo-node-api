module.exports = (sequelize, dataType) => {
  if (!dataType) return
  return sequelize.define('users', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: "Name must be atleast 3 characters in length"
        }
      }
    }
  })
}
