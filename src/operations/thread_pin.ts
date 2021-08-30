import { JSONValue, log, TypedMap } from "@graphprotocol/graph-ts";
import { Message } from "../../generated/Relay/Relay";
import { User } from "../../generated/schema";
import { ensureString } from "../ensure";
import { isBoardJanny } from "../internal/board_janny";
import { eventId } from "../id";
import { loadThreadFromId } from "../internal/thread";
import { loadPostFromId } from "../internal/post";

export function threadPin(message: Message, user: User, data: TypedMap<string, JSONValue>): boolean {
    let threadId = ensureString(data.get("id"))
    let evtId = eventId(message)
    if(threadId == null) {
        log.warning("Invalid thread pin request: {}", [evtId]);

        return false
    }

    log.info("Pinning thread: {}", [threadId]);
    
    let thread = loadThreadFromId(threadId)
    if (thread == null) {
        log.warning("Thread {} not found", [threadId]);

        return false
    }

    let op = loadPostFromId(threadId)
    if(op == null) {
        log.error("Thread {} op not found, wtf?", [threadId])

        return false
    }

    if((op.from != user.id) && !isBoardJanny(user.id, thread.board)) {
        log.warning("Thread {} not owned by {}, skipping {}", [threadId, user.id, evtId])

        return false
    }

    if(thread.isPinned) {
        log.warning("Thread {} already pinned, skipping {}", [threadId, evtId])

        return false
    }
    
    thread.isPinned = true
    thread.save()

    log.info("Thread pinned: {}", [threadId])
    
    return true
}