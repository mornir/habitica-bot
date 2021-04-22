describe('My First Test', () => {
  it('testing', () => {
    cy.request({
      url: 'http://127.0.0.1:8787/',
      method: 'POST',
      body: {
        group: {
          id: '5f98dbe0-c888-4dbf-aa0e-fc317c9c8f8c',
          name: 'super_squad ',
        },
        chat: {
          flagCount: 0,
          _id: '88a99b4c-d630-45b8-9162-da087f7e2456',
          flags: {},
          id: '88a99b4c-d630-45b8-9162-da087f7e2456',
          text:
            "`Marshmallow attacks Vice's Shade for 10.5 damage. Vice's Shade attacks party for 0.0 damage.`",
          unformattedText:
            "Marshmallow attacks Vice's Shade for 10.5 damage. Vice's Shade attacks party for 0.0 damage.",
          info: {
            type: 'boss_damage',
            user: 'Marshmallow',
            quest: 'vice1',
            userDamage: '10.5',
            bossDamage: '0.0',
          },
          timestamp: 1615134845081,
          likes: {},
          uuid: 'system',
          groupId: '5f38dbe0-b949-4dbf-aa0e-fc317c9cbf8c',
        },
        webhookType: 'groupChatReceived',
        user: { _id: '5454544ea-134d-4e37-bbdc-310351b35729' },
      },
    }).should((response) => {
      cy.log(response)
      expect(response.status).to.eq(200)
    })
  })
})
