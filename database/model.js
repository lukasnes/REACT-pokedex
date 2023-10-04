import { Model,DataTypes } from 'sequelize'
import util from 'util'
import connectToDB from './db.js'

export const db = await connectToDB('postgresql:///teams')

export class User extends Model {
    [util.inspect.custom](){
        return this.toJSON()
    }
}

export class Team extends Model {
    [util.inspect.custom](){
        return this.toJSON()
    }
}

export class TeamPokemon extends Model {
    [util.inspect.custom](){
        return this.toJSON()
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'user',
        sequelize: db
    }
)

Team.init(
    {
        teamId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        teamName: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'team',
        sequelize: db
    }
)

TeamPokemon.init(
    {
        teamPokemonId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        spriteUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'teamPokemon',
        sequelize: db
    }
)

User.hasMany(Team, {foreignKey: 'userId'})
Team.belongsTo(User, {foreignKey: 'userId'})

Team.hasMany(TeamPokemon, {foreignKey: 'teamId'})
TeamPokemon.belongsTo(Team, {foreignKey: 'teamId'})