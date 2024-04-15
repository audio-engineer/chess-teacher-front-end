import type { FC, ReactElement } from "react";
import { useMemo } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import type {
  IStorage,
  MessageContent,
  UpdateState,
} from "@chatscope/use-chat";
import {
  AutoDraft,
  BasicStorage,
  ChatMessage,
  ChatProvider as ChatscopeChatProvider,
  Conversation,
  ConversationRole,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  Participant,
  Presence,
  TypingUsersList,
  User as UseChatUser,
  UserStatus,
} from "@chatscope/use-chat";
import { nanoid } from "nanoid";
import { ChatService } from "@/chat/chat-service";
import Chat from "@/components/chat";
import type { MatchId, MatchPlayerInfo } from "@/types/database";
import type { User as FirebaseUser } from "@firebase/auth";

interface ChatProviderProps {
  readonly fen: string;
  readonly player: MatchPlayerInfo | null;
  readonly legalMoveCount: number;
  readonly user: FirebaseUser;
  readonly mid: MatchId;
}

const messageIdGenerator = (): string => nanoid();
const groupIdGenerator = (): string => nanoid();

const serviceFactory = (
  storage: Readonly<IStorage>,
  updateState: UpdateState,
): ChatService => {
  return new ChatService(storage, updateState);
};

const getUserStorage = (mid: MatchId, opponent: UseChatUser): BasicStorage => {
  const userStorage = new BasicStorage({
    groupIdGenerator,
    messageIdGenerator,
  });

  const initialMessage =
    "Hello, this is Stockfish. I will provide you with insightful feedback during the game!";

  userStorage.addUser(opponent);
  userStorage.addConversation(
    new Conversation({
      id: mid,
      participants: [
        new Participant({
          id: "Stockfish",
          role: new ConversationRole([]),
        }),
      ],
      unreadCounter: 0,
      typingUsers: new TypingUsersList({ items: [] }),
      draft: "",
    }),
  );

  userStorage.addMessage(
    new ChatMessage({
      id: "",
      contentType: MessageContentType.TextHtml,
      status: MessageStatus.Sent,
      direction: MessageDirection.Incoming,
      senderId: "Stockfish",
      content:
        initialMessage as unknown as MessageContent<MessageContentType.TextHtml>,
    }),
    mid,
  );

  return userStorage;
};

const stockfishUser = new UseChatUser({
  id: "Stockfish",
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: "Stockfish",
  email: "",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbn0p2CQByeW7xrsZPMiNoSogdUks_Um7rEDIGqh4wGQ&s",
  bio: "",
});

const ChatProvider: FC<ChatProviderProps> = ({
  fen,
  player,
  legalMoveCount,
  user,
  mid,
}: ChatProviderProps): ReactElement | null => {
  const userUser = useMemo(
    () =>
      new UseChatUser({
        id: user.email ?? "",
        presence: new Presence({
          status: UserStatus.Available,
          description: "",
        }),
        firstName: "",
        lastName: "",
        username: user.email ?? "",
        email: user.email ?? "",
        avatar: "",
        bio: "",
      }),
    [user],
  );

  return (
    <ChatscopeChatProvider
      serviceFactory={serviceFactory}
      storage={getUserStorage(mid, stockfishUser)}
      config={{
        typingThrottleTime: 250,
        typingDebounceTime: 900,
        debounceTyping: true,
        autoDraft: AutoDraft.Save | AutoDraft.Restore,
      }}
    >
      <Chat
        fen={fen}
        player={player}
        legalMoveCount={legalMoveCount}
        useChatUser={userUser}
        firebaseUser={user}
        mid={mid}
      />
    </ChatscopeChatProvider>
  );
};

export default ChatProvider;
