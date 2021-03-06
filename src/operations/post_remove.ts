import { BigInt, JSONValue, log, store, TypedMap } from "@graphprotocol/graph-ts";
import { Message } from "../../generated/Relay/Relay";
import { User } from "../../generated/schema";
import { ensureArray, ensureString } from "../ensure";
import { isBoardJanny } from "../internal/board_janny";
import { eventId } from "../id";
import { loadPostFromId } from "../internal/post";
import { loadThreadFromId } from "../internal/thread";
import { loadBoardFromId } from "../internal/board";

export function postRemove(message: Message, user: User, data: TypedMap<string, JSONValue>): boolean {
    let evtId = eventId(message)
    let postIdValues = ensureArray(data.get("ids"))
    if(postIdValues == null) {
        postIdValues = []

        let maybeThreadId = data.get("id")
        if (maybeThreadId !== null) {
            postIdValues = [maybeThreadId as JSONValue]
        }
    }

    if(!postIdValues.length) {
        log.warning("Invalid post remove request: {}", [evtId]);

        return false
    }

    // Check
    for (let i = 0; i < postIdValues.length; i++) {
        let postId: string = ensureString((postIdValues as JSONValue[])[i])
        
        if(postId == null) {
            log.warning("Invalid post remove request: {}", [evtId]);
            
            return false
        }

        log.debug("Requested post removal: {}", [postId]);

        let post = loadPostFromId(postId)
        if (post == null) {
            log.warning("Post {} not found, skipping {}", [postId, evtId])

            return false
        }

        if ((post.from != user.id) && !isBoardJanny(user, post.board)) {
            log.warning("Post {} not owned by {}, skipping {}", [postId, user.id, evtId])

            return false
        }
    }

    for (let i = 0; i < postIdValues.length; i++) {
        let postId: string = ensureString((postIdValues as JSONValue[])[i])

        // @TODO I hate to load twice
        let post = loadPostFromId(postId)
        let thread = loadThreadFromId(postId)

        // Avoid duplicate post deletion
        if (post != null) {
            // Thread creation post?
            if (thread != null) {
                let board = loadBoardFromId(thread.board)
                if(board != null) {
                    board.threadCount = board.threadCount.minus(BigInt.fromI32(1))
                    board.postCount = board.postCount.minus(thread.replyCount).minus(BigInt.fromI32(1))
                    board.save()
                }

                // Remove the thread
                store.remove("Thread", thread.id)
            } else {
                // Keep counts in check
                thread = loadThreadFromId(post.thread)
                if(thread != null) {
                    thread.replyCount = thread.replyCount.minus(BigInt.fromI32(1))
                    thread.imageCount = thread.imageCount.minus(BigInt.fromI32(post.image != null ? 1 : 0))

                    thread.save()
                }

                let board = loadBoardFromId(post.board)
                if(board != null) {
                    board.postCount = board.postCount.minus(BigInt.fromI32(1))

                    board.save()
                }
            }

            log.debug("Removing post: {}okow", [postId])
    
            store.remove("Post", postId)
    
            log.info("Post removed: {}", [postId])
        } else {
            log.warning("Duplicate post deletion value {}: {}", [postId, evtId])
        }
    }

    return true
}