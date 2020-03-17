'use strict';
const {addWeeks} = require('date-fns');

/**
 * Lifecycle callbacks for the `onsite-course` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model, attrs, options) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, response, options) => {},

  // Before fetching a value.
  // Fired before a `fetch` operation.
  // beforeFetch: async (model, columns, options) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, response, options) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model, columns, options) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, response, options) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model, attrs, options) => {},

  // After creating a value.
  // Fired after an `insert` query.
  afterCreate: async (model, attrs, options) => {
    
    for (let i = 0; i < attrs.number_of_onsite_lessons; i++) {
      await strapi.services["onsite-lesson"].create({
        description: "[enter description here]",
        date: addWeeks(attrs.date, i)
      })
    }
  },

  // Before updating a value.
  // Fired before an `update` query.
  beforeUpdate: async (model, attrs, options) => {
    const prev = await strapi.query("onsite-course").findOne({_id: model.id});
    console.log(prev,model);

    if (prev.number_of_onsite_lessons != model.number_of_onsite_lessons) {
      throw new Error("Can't change number of lessons - delete or create onsite lessons instead.")
    }
    if (prev.number_of_onsite_projects != model.number_of_onsite_projects) {
      throw new Error("Can't change number of projects - delete or create onsite projects instead.")
    }
  },

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, attrs, options) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model, attrs, options) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, attrs, options) => {}
};
