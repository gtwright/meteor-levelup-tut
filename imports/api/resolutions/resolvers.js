import Resolutions from './resolutions';
import Goals from '../goals/goals';

// Resolutions.insert({
//   name: "Test Res"
// })

// const res = Resolutions.find({}).fetch();
// console.log(res);

export default {
  Query: {
    resolutions(obj, args, { userId }){
      return Resolutions.find({
        userId
      }).fetch();
    }
  },

  Resolution: {
    goals(obj){
      console.log("goals!");
      return Goals.find({
        resolutionId: obj._id
      }).fetch();
    },
    completed(obj){
      const goals = Goals.find({
        resolutionId: obj._id
      }).fetch();
      if (goals.length === 0) return false;
      return goals.every(obj=>obj.completed===true);
    }
  },

  Mutation: {
    createResolution(obj,{ name },{ userId }){
      const resolutionId = Resolutions.insert({
        name,
        userId
      });
      return Resolutions.findOne(resolutionId);
    },
    deleteResolution(obj, {id}){
      console.log(id);
      Resolutions.remove({_id: id})
      const resolutions = Resolutions.find().fetch();
      return resolutions;
    },
    updateResolution(obj, {id, name}){
      console.log(id);
      console.log(name);
      Resolutions.update(id, {
        $set: {
          name: name
        }
      });
      return Resolutions.findOne(id);
    }

  }
}
