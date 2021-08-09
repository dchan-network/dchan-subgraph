// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Board extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Board entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Board entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Board", id.toString(), this);
  }

  static load(id: string): Board | null {
    return store.get("Board", id) as Board | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get postCount(): BigInt {
    let value = this.get("postCount");
    return value.toBigInt();
  }

  set postCount(value: BigInt) {
    this.set("postCount", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    return value.toBigInt();
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }

  get isLocked(): boolean {
    let value = this.get("isLocked");
    return value.toBoolean();
  }

  set isLocked(value: boolean) {
    this.set("isLocked", Value.fromBoolean(value));
  }

  get createdBy(): string {
    let value = this.get("createdBy");
    return value.toString();
  }

  set createdBy(value: string) {
    this.set("createdBy", Value.fromString(value));
  }
}

export class Thread extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Thread entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Thread entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Thread", id.toString(), this);
  }

  static load(id: string): Thread | null {
    return store.get("Thread", id) as Thread | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get board(): string {
    let value = this.get("board");
    return value.toString();
  }

  set board(value: string) {
    this.set("board", Value.fromString(value));
  }

  get isSticky(): boolean {
    let value = this.get("isSticky");
    return value.toBoolean();
  }

  set isSticky(value: boolean) {
    this.set("isSticky", Value.fromBoolean(value));
  }

  get isLocked(): boolean {
    let value = this.get("isLocked");
    return value.toBoolean();
  }

  set isLocked(value: boolean) {
    this.set("isLocked", Value.fromBoolean(value));
  }

  get op(): string {
    let value = this.get("op");
    return value.toString();
  }

  set op(value: string) {
    this.set("op", Value.fromString(value));
  }

  get subject(): string {
    let value = this.get("subject");
    return value.toString();
  }

  set subject(value: string) {
    this.set("subject", Value.fromString(value));
  }

  get replies(): Array<string> {
    let value = this.get("replies");
    return value.toStringArray();
  }

  set replies(value: Array<string>) {
    this.set("replies", Value.fromStringArray(value));
  }

  get replyCount(): BigInt {
    let value = this.get("replyCount");
    return value.toBigInt();
  }

  set replyCount(value: BigInt) {
    this.set("replyCount", Value.fromBigInt(value));
  }

  get imageCount(): BigInt {
    let value = this.get("imageCount");
    return value.toBigInt();
  }

  set imageCount(value: BigInt) {
    this.set("imageCount", Value.fromBigInt(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    return value.toBigInt();
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }
}

export class Post extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Post entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Post entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Post", id.toString(), this);
  }

  static load(id: string): Post | null {
    return store.get("Post", id) as Post | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get thread(): string | null {
    let value = this.get("thread");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set thread(value: string | null) {
    if (value === null) {
      this.unset("thread");
    } else {
      this.set("thread", Value.fromString(value as string));
    }
  }

  get n(): BigInt {
    let value = this.get("n");
    return value.toBigInt();
  }

  set n(value: BigInt) {
    this.set("n", Value.fromBigInt(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (value === null) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(value as string));
    }
  }

  get from(): string {
    let value = this.get("from");
    return value.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get comment(): string {
    let value = this.get("comment");
    return value.toString();
  }

  set comment(value: string) {
    this.set("comment", Value.fromString(value));
  }

  get image(): string | null {
    let value = this.get("image");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set image(value: string | null) {
    if (value === null) {
      this.unset("image");
    } else {
      this.set("image", Value.fromString(value as string));
    }
  }

  get createdAtUnix(): BigInt {
    let value = this.get("createdAtUnix");
    return value.toBigInt();
  }

  set createdAtUnix(value: BigInt) {
    this.set("createdAtUnix", Value.fromBigInt(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    return value.toBigInt();
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save User entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save User entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("User", id.toString(), this);
  }

  static load(id: string): User | null {
    return store.get("User", id) as User | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isJanny(): boolean {
    let value = this.get("isJanny");
    return value.toBoolean();
  }

  set isJanny(value: boolean) {
    this.set("isJanny", Value.fromBoolean(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    return value.toBigInt();
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }
}

export class Image extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Image entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Image entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Image", id.toString(), this);
  }

  static load(id: string): Image | null {
    return store.get("Image", id) as Image | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get byteSize(): BigInt {
    let value = this.get("byteSize");
    return value.toBigInt();
  }

  set byteSize(value: BigInt) {
    this.set("byteSize", Value.fromBigInt(value));
  }

  get ipfsHash(): string {
    let value = this.get("ipfsHash");
    return value.toString();
  }

  set ipfsHash(value: string) {
    this.set("ipfsHash", Value.fromString(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    return value.toBigInt();
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }
}