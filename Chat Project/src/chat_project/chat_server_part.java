package chat_project;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JButton;
import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.awt.event.ActionEvent;
import javax.swing.JCheckBox;
import javax.swing.JTextArea;
import java.awt.Color;
import javax.swing.BoxLayout;
import java.awt.Cursor;
import java.awt.ComponentOrientation;
import javax.swing.JTextField;
import javax.swing.JLabel;

import java.net.ServerSocket;
import java.net.Socket ;


public class chat_server_part {

	static JFrame frame;
	static JTextField msg_field;
	static JButton msg_send ;
	static JTextArea msg_area ;
	
	private static ServerSocket ss ;
	private static Socket s ;
	private static DataInputStream din ;
	private static DataOutputStream dout ; 
	

	

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					chat_server_part window = new chat_server_part();
					chat_server_part.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
		
		String msgin = "" ;
		
		try {
			
			ss = new ServerSocket(1255) ; // Server is open for this port 
			s = ss.accept() ; // if Client is connected 
			
			din = new DataInputStream(s.getInputStream()) ;
			dout = new DataOutputStream(s.getOutputStream()) ;
			
			while(!msgin.equals("exit")) {
				msgin = din.readUTF() ;
				msg_area.setText(msg_area.getText().trim() + "\nClient : \t" + msgin); // displaying message
				
				
				
			}
			
			
			
			
			
		}
		
		catch(Exception e) {
			
			msg_area.append("\nThere is a problem with the server ?!\n") ;
			
		}
		
		
		
	}

	/**
	 * Create the application.
	 */
	public chat_server_part() {
		
		// creating the frame of the chat
		
		frame = new JFrame("Server");
		frame.setBounds(100, 100, 695, 491);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		// creating the button and his action Event
		
		msg_send = new JButton("Send Message ");
		msg_send.setBounds(553, 393, 124, 46);
		msg_send.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		msg_send.setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
		msg_send.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				 String msgout = msg_field.getText().trim();
				 
				 if(msgout.equals("exit")) {
					 msg_area.append("Server is disconnected ! Goodbye ...");
					 System.exit(0);
				 }
				 
				 else {
					 
					 // Putting Client message in the text field 
					 
					 msg_area.setText(msg_area.getText().trim() + "\n Server : \t" + msgout);
					 
					 
					 // Sending data to Client 
					 try {
						
						 
						dout.writeUTF(msgout);
						
					} catch (Exception e1) {
						
						msg_area.append("There is a problem with the server ?!" + "\n") ;
						
					}
					 
				 }
				
				
				
			}
		});
		
		
		frame.getContentPane().setLayout(null);
		frame.getContentPane().add(msg_send);
		
		// creating the Message Field , where the messages from both sides will be printed
		
		msg_field = new JTextField();
		msg_field.setName("msg_text");
		msg_field.setBounds(32, 393, 486, 46);
		frame.getContentPane().add(msg_field);
		msg_field.setColumns(10);
		
		// creating the message area where the user will type their message 
		
		msg_area = new JTextArea();
		msg_area.setName("msg_area");
		msg_area.setBounds(32, 39, 537, 332);
		frame.getContentPane().add(msg_area);
		
		
	
		
		
		
	}
}
