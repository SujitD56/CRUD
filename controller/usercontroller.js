const userlist = require("../models/user");

exports.getuser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const nameFilter = req.query.name;
  const createdAtFilter = req.query.createdAt;
  const matchStage = {};

  if (nameFilter) {
    matchStage.name = { $regex: new RegExp(nameFilter, "i") };
  }

  if (createdAtFilter) {
    matchStage.createdAt = {
      $gte: new Date(createdAtFilter),
      $lt: new Date(
        new Date(createdAtFilter).setDate(
          new Date(createdAtFilter).getDate() + 1
        )
      ),
    };
  }

  try {
    const userList = await userlist.countDocuments(matchStage);
    const users = await userlist.aggregate([
      { $match: matchStage },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    const totalPages = Math.ceil(userList / limit);

    res.json({
      users: users,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
