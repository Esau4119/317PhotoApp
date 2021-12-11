"use strict";
const mysql = require("mysql2/promise");

function displayWarningMessage(warning) {
  switch (warning.Code) {
    case 1007:
      console.log(`Skipping Database Creation --> ${warning.Message}`);
      break;
    case 1050:
      console.log(`Skipping Table Creation --> ${warning.Message}`);
      break;
  }
}

async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    //TODO make sure to change to the user you want to use
    user: "root", //Your DB username
    //TODO make sure to change to the correct password for your user.
    password: "Esau7777", //Your DB password
  });
}

async function makeDatabase(connection) {
  //TODO make sure to change yourdbnamehere
  const [result, _] = await connection.query(
    "CREATE DATABASE IF NOT EXISTS csc317db;"
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Database!");
  }
}

async function makeUsersTable(connection) {
  const [result, _] = await connection.query(
    // Users Table SQL Goes here
    `CREATE TABLE IF NOT EXISTS csc317db.users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(128) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      active INT NOT NULL DEFAULT 1,
      created DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
      UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE,
      UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE)
    ENGINE = InnoDB;`
  );

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Users Table!");
  }
}

async function makePostsTable(connection) {
  const [result, _] = await connection.query(
    // Posts Table SQL Goes here
    `CREATE TABLE IF NOT EXISTS csc317db.posts (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(128) NOT NULL,
      description MEDIUMTEXT NOT NULL,
      photopath VARCHAR(2048) NOT NULL,
      thumbnail VARCHAR(2048) NOT NULL,
      active INT NOT NULL DEFAULT 1,
      created DATETIME NOT NULL,
      fk_userId INT NOT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
      INDEX post_author_idx (fk_userId ASC) VISIBLE,
      CONSTRAINT post_author
        FOREIGN KEY (fk_userId)
        REFERENCES csc317db.users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE)
    ENGINE = InnoDB;`
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Posts Table!");
  }
}

async function makeCommentsTable(connection) {
  const [result, _] = await connection.query(
    // Comments Table SQL Goes here
    `CREATE TABLE comments (
      id int NOT NULL AUTO_INCREMENT,
      comment mediumtext NOT NULL,
      fk_postId int NOT NULL,
      fk_authorId int NOT NULL,
      created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY id_UNIQUE (id),
      KEY comment_author_idx (fk_authorId),
      KEY comment_belongsTo_idx (fk_postId),
      CONSTRAINT comment_author FOREIGN KEY (fk_authorId) REFERENCES users (id),
      CONSTRAINT comment_belongsTo FOREIGN KEY (fk_postId) REFERENCES posts (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Comments Table!");
  }
}

(async function main() {
  let connection = null;
  try {
    connection = await getConnection();
    await makeDatabase(connection); // make DB
    //TODO make sure to change yourdbnamehere
    await connection.query("USE csc317db"); // set new DB to the current DB
    await makeUsersTable(connection); // try to make user table
    await makePostsTable(connection); // try to make posts table
    await makeCommentsTable(connection); // try to make comments table
    connection.close();
    return;
  } catch (error) {
    console.error(error);
    if (connection != null) {
      connection.close();
    }
  }
})();
