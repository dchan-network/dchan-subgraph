import { BigInt, JSONValue, log, TypedMap } from "@graphprotocol/graph-ts";
import { Message } from "../../generated/Relay/Relay";
import { Board, BoardJanny, User } from "../../generated/schema";
import { ensureBoolean, ensureNumber, ensureString } from "../ensure";
import { scoreDefault } from "../score";
import { eventId } from "../id";
import { boardJannyId } from "../internal/board_janny";
import { locateBlockFromMessage } from "../internal/block";
import { BOARD_NAME_MAX_LENGTH, BOARD_TITLE_MAX_LENGTH } from '../constants'
import { boardId } from "../internal/board";
import { createBoardRefs } from "../internal/board_ref";

export function boardCreate(message: Message, user: User, data: TypedMap<string, JSONValue>): boolean {
    let evtId = eventId(message)
    let block = locateBlockFromMessage(message)

    log.info("Creating board: {}", [evtId]);

    // { "name": "dchan", "title": "dchan.network" }
    let name = ensureString(data.get("name"))
    let title = ensureString(data.get("title"))
    let threadLifetime = ensureNumber(data.get("thread_lifetime"))

    if (name == null || title == null || name.length == 0 || name.length > BOARD_NAME_MAX_LENGTH || title.length == 0 || title.length > BOARD_TITLE_MAX_LENGTH) {
        log.warning("Invalid board", [])

        return false
    }

    let board = new Board(boardId(message))
    board.name = name
    board.title = title
    board.threadCount = BigInt.fromI32(0)
    board.postCount = BigInt.fromI32(0)
    board.score = scoreDefault()
    board.createdBy = user.id
    board.createdAtBlock = block.id
    board.createdAt = block.timestamp
    board.lastBumpedAtBlock = block.id
    board.lastBumpedAt = block.timestamp
    board.isNsfw = ("true" === ensureBoolean(data.get("nsfw"))) || false
    board.isLocked = false
    board.threadLifetime = threadLifetime

    createBoardRefs(message, board)

    let boardJanny = new BoardJanny(boardJannyId(user, board.id))
    boardJanny.grantedAtBlock = block.id
    boardJanny.grantedAt = block.timestamp
    boardJanny.board = board.id
    boardJanny.user = user.id
    
    user.save()
    board.save()
    boardJanny.save()

    log.info("Board created: {}", [evtId]);

    return true
}