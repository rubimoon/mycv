// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class test1649072390255 {
  name = 'test1649072390255';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_report"("id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId" FROM "report"`,
    );
    await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_report" RENAME TO "report"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "UQ_0d5dc8337aef49af3d8133c4ff6" UNIQUE ("price"), CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_report"("id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId" FROM "report"`,
    );
    await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_report" RENAME TO "report"`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "report" RENAME TO "temporary_report"`,
    );
    await queryRunner.query(
      `CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "report"("id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId" FROM "temporary_report"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_report"`);
    await queryRunner.query(
      `ALTER TABLE "report" RENAME TO "temporary_report"`,
    );
    await queryRunner.query(
      `CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "report"("id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "lng", "lat", "mileage", "approved", "userId" FROM "temporary_report"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_report"`);
  }
};
