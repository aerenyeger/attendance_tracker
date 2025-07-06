const Attendance = require("../models/attendanceschema");
const bcrypt=require("bcrypt")
exports.check_login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Attendance.findOne({
      username: username,
    });
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    const dbpassword=user.password;
    const isMatch=await bcrypt.compare(password,dbpassword)
    if (isMatch) {
        console.log(user)
      return res.status(200).json(user);
    }
    return res.status(400).json({ message: "invalid password" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.check_signup = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const exist = await Attendance.findOne({ username: username });
    if (exist) {
      return res
        .status(400)
        .json({ message: "user already exist with this name " });
    } else {
        const saltrounds=10;
        const hashedpassword=await bcrypt.hash(password,saltrounds)
      const attendance = new Attendance({
        username: username,
        password: hashedpassword,
      });
      await attendance.save();
      return res.status(200).json({
        _id:attendance._id,
        username:attendance.username,
        password:attendance.password
      });
    }
  } catch (error) {
    console.log("error while saving");
    console.log(error.message);
  }
};

exports.attendance_info = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const attend = await Attendance.findOne({
      username: username,
      password: password,
    });
    return res.status(200).json(attend);
  } catch (error) {
    console.log("error while saving");
    console.log(error.message);
  }
};

exports.add_present = async (req, res) => {
  try {
    console.log("req received");
    const subj = req.body.subject;
    const _id = req.body._id;
    const attend = await Attendance.findById(_id);
    const toadd = attend.subjects.find((s) => s.subject === subj);
    toadd.present += 1;
    toadd.totalClasses += 1;
    await attend.save();
    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.log("req received");
    console.log(error.message);
  }
};

exports.add_absent = async (req, res) => {
  try {
    console.log("req received");
    const subj = req.body.subject;
    const _id = req.body._id;
    const attend = await Attendance.findById(_id);
    const toadd = attend.subjects.find((s) => s.subject === subj); //we cant use{} or if we want to use return is required
    toadd.totalClasses += 1;
    await attend.save();
    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    console.log("req received");
    console.log(error.message);
  }
};

exports.delete_subject = async (req, res) => {
  try {
    const _id = req.body._id;
    const subject = req.body.subject;
    const update = await Attendance.findByIdAndUpdate(
      { _id: _id },
      {
        $pull: {
          subjects: {
            subject: subject,
          },
        },
      },
      { new: true }
    );
    if (update) {
      return res.status(200).json({ message: "successfully updated" });
    }
    return res.status(400);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.add_subject = async (req, res) => {
  try {
    const _id = req.body._id;
    const subject = req.body.subject;
    console.log(_id);
    const subj = await Attendance.findById({ _id: _id });
    const array_to_update = subj.subjects;
    array_to_update.push({ subject: subject, present: 0, totalClasses: 0 });
    await subj.save();
    console.log("successfully saved");
    return res.status(200).json({ message: "successfully saved" });
  } catch (error) {
    console.log("error");
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "error while adding the subject in the database" });
  }
};

// exports.add_present = async (req, res) => {
//   try {
//     const subj = req.body.subject;
//     const _id = req.body._id;

//     const attend = await Attendance.findById(_id);
//     if (!attend) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const toadd = attend.subjects.find(s => s.subject === subj);
//     if (!toadd) {
//       return res.status(404).json({ message: "Subject not found" });
//     }

//     toadd.present += 1;
//     toadd.totalClasses += 1;

//     await attend.save(); // ✅ Save the document

//     return res.status(200).json({ message: "Successfully updated", data: attend });

//   } catch (error) {
//     console.error("Error in add_present:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
//};

// const Attendance = require("../models/attendanceschema");

// exports.delete_subject = async (req, res) => {
//   try {
//     const { _id, subject } = req.body;

//     const updated = await Attendance.findByIdAndUpdate(
//       _id,
//       { $pull: { subjects: { subject: subject } } },
//       { new: true } // returns the updated document
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "Subject deleted", data: updated });
//   } catch (error) {
//     console.error("Error deleting subject:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// const Attendance = require("../models/attendanceschema");

// exports.delete_subject = async (req, res) => {
//   try {
//     const { _id, subject } = req.body;

//     // Step 1: Fetch the document
//     const attend = await Attendance.findById(_id);
//     if (!attend) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Step 2: Filter out the subject you want to delete
//     const originalLength = attend.subjects.length;
//     attend.subjects = attend.subjects.filter(s => s.subject !== subject);

//     if (attend.subjects.length === originalLength) {
//       return res.status(404).json({ message: "Subject not found" });
//     }

//     // Step 3: Save the updated document
//     await attend.save();

//     return res.status(200).json({ message: "Subject deleted successfully", data: attend });

//   } catch (error) {
//     console.error("Error deleting subject:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// const Attendance = require("../models/attendanceschema");

// exports.add_subject = async (req, res) => {
//   try {
//     const { _id, subject } = req.body;

//     const updated = await Attendance.findByIdAndUpdate(
//       _id,
//       {
//         $push: {
//           subjects: {
//             subject: subject,
//             present: 0,
//             totalClasses: 0,
//           },
//         },
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "Subject added", data: updated });
//   } catch (error) {
//     console.error("Error adding subject:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.add_subject = async (req, res) => {
//   try {
//     const { _id, subject } = req.body;

//     const attend = await Attendance.findById(_id);
//     if (!attend) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if subject already exists
//     const exists = attend.subjects.find(s => s.subject === subject);
//     if (exists) {
//       return res.status(400).json({ message: "Subject already exists" });
//     }

//     attend.subjects.push({ subject, present: 0, totalClasses: 0 });
//     await attend.save();

//     return res.status(200).json({ message: "Subject added", data: attend });
//   } catch (error) {
//     console.error("Error:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// const [subjects, setSubjects] = useState(["Math", "Physics"]);

// function addSubject(newSubj) {
//   setSubjects(prev => [...prev, newSubj]);
// }

//Because .push() modifies the original array, which is not recommended in React, since React depends on state immutability to detect changes and trigger re-renders.
