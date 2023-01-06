package com.example.springbootwebsocket;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ChatMessageHandler extends TextWebSocketHandler {

    List<WebSocketSession> webSocketSessions = Collections.synchronizedList(new ArrayList<>());
    ArrayList<WebSocketMessage<?>> messages = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        webSocketSessions.add(session);
        for (WebSocketMessage<?> m : messages) {
            session.sendMessage(m);
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        webSocketSessions.remove(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

        super.handleMessage(session, message);
        if (message.getPayload().equals("null")) {
            // System.out.println("Ticker msg");
        } else {
            System.out.println("handleMessage:" + message);
            messages.add(message);
            if (messages.size() >= 5) {
                messages.remove(0);
            }
            for (WebSocketSession webSocketSession : webSocketSessions) {
                webSocketSession.sendMessage(message);
            }
        }
    }

}
