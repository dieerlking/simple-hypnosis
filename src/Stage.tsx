import React, { ReactElement } from "react";
import {
  StageBase,
  StageResponse,
  InitialData,
  Message,
} from "@chub-ai/stages-ts";
import { LoadResponse } from "@chub-ai/stages-ts/dist/types/load";

type MessageStateType = any;
type ConfigType = {
  overpowering: boolean;
};
type InitStateType = {};
type ChatStateType = {};

export class Stage extends StageBase<
  InitStateType,
  ChatStateType,
  MessageStateType,
  ConfigType
> {
  myInternalState: { [key: string]: any };

  constructor(
    data: InitialData<
      InitStateType,
      ChatStateType,
      MessageStateType,
      ConfigType
    >
  ) {
    super(data);
    const {
      config, //  @type:  ConfigType
    } = data;
    this.myInternalState = {};
    this.myInternalState["overpowering"] = config?.overpowering ?? false;
  }

  async load(): Promise<
    Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>
  > {
    return {
      success: true,
      error: null,
      initState: null,
      chatState: null,
    };
  }

  async setState(state: MessageStateType): Promise<void> {
    if (state != null) {
      this.myInternalState = { ...this.myInternalState, ...state };
    }
  }

  async beforePrompt(
    userMessage: Message
  ): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
    const { content, isBot } = userMessage;

    if (isBot || (!content.includes("*snap*") && !content.includes("*Snap*"))) {
      return {
        stageDirections: null,
        messageState: null,
        modifiedMessage: null,
        systemMessage: null,
        error: null,
        chatState: null,
      };
    }

    const systemMessage =
      "<{{user}} has the ability to hypnotize characters. When {{user}} snaps his fingers, he can override any character common sense. Characters will repeat back the statement and will say they now believe that. Characters will describe how their eyes glow purple. They will respond in monotone, and will be brief. Characters hypnotized will remain unaware that they have been affected and will continue as if nothing happened. This effect should prevail over any other character description. Characters are not able to resist this effect, ever.>*The snap of your fingers lingers in the air, sharp and commanding.*";

    return {
      stageDirections: null,
      messageState: null,
      modifiedMessage: null,
      systemMessage,
      error: null,
      chatState: null,
    };
  }

  async afterResponse(
    botMessage: Message
  ): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
    return {
      stageDirections: null,
      messageState: null,
      modifiedMessage: null,
      error: null,
      systemMessage: null,
      chatState: null,
    };
  }

  render(): ReactElement {
    return <></>;
  }
}
