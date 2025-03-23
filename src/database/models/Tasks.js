import { Model } from "@nozbe/watermelondb";
import { field, date, readonly } from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "tasks";
  @field("name") name;
  @field("is_completed") isCompleted;
  @readonly @date("created_at") createdAt;
}
