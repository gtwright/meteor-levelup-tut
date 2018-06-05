// import U from './resolutions';

// Resolutions.insert({
//   name: "Test Res"
// })

// const res = Resolutions.find({}).fetch();
// console.log(res);

export default {
  Query: {
    user(obj, args, { user }){
      return user || {};
    }
  },
  User: {
    email: (obj, args, ctx) => {
      return ctx.user.emails[0].address || null
    }
  }
};
