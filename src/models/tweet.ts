import { sql } from "slonik";
import db from "../lib/db";
import { z } from "zod";

export interface Tweet {
  id: string;
  name: string;
  body: string;
}

const getAll = async () => {
  const { rows } = await db.conn.query(sql`select * from tweets`);
  return rows as unknown as Tweet[];
};

const create = async (data: Tweet) =>
  db.conn.query(sql`
    insert into tweets (name, body) values (${data.name}, ${data.body})
  `);

const del = (id: number) =>
  db.conn.query(sql`delete from tweets where id = ${id}`);

export default { getAll, create, del };
