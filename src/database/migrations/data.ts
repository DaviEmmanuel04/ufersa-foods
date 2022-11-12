import { IRecipeDB } from "../../models/Recipe"
import { IUserDB, USER_ROLES } from "../../models/User"

export const users: IUserDB[] = [
    {
        id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        name: "Astrodev",
        email: "astrodev@gmail.com",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
        role: USER_ROLES.ADMIN
    },
    {
        id: "f03017bb-2c08-4cdc-bb63-7fbd7cebe01f",
        name: "Fulano",
        email: "fulano@gmail.com",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
        role: USER_ROLES.NORMAL
    },
    {
        id: "7079b8e4-95cd-48aa-82a9-77454e94b789",
        name: "Ciclana",
        email: "ciclana@gmail.com",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123
        role: USER_ROLES.NORMAL
    }
]

export const recipes: IRecipeDB[] = [
    {
        id: 'c4248845-3376-46d2-8073-6f5b93a50caf',
        title: 'Miojo',
        description: 'Prato fino, muito apreciado por universitarios e pessoas sem tempo',
        imageURL: 'https://static.clubeextra.com.br/img/uploads/1/313/590313.png',
        ingredients: 'miojo, água',
        preparation: 'Coloque água em uma panela, leve ao fogo e espere ferver. Adicione o macarrão e aguarde por 3 minutos, apague o fogo e adicione o tempero'
    },
    {
        id: '9eace6eb-428c-4dcb-86bf-259ac192aa34',
        title: 'Big Mac',
        description: "Famoso hambúrger do MC Donald's",
        imageURL: 'https://conteudo.imguol.com.br/c/noticias/23/2019/11/26/o-lanche-big-mac-do-mcdonalds-1574807643968_v2_1x1.png',
        ingredients: '2 hambúrgers, alface, queijo, molho especial, cebola, picles, pão com gergelim',
        preparation: "Só pedir no MC Donald's que já prontinho"
    }
]