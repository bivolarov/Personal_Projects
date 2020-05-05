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

import javax.swing.JFrame;

public class chat_client_part {

	static JFrame frame;
	static JTextField msg_field;
	static JButton msg_send ;
	static JTextArea msg_area ;
	
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
					chat_client_part window = new chat_client_part();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
		
		String msgin = "" ;
		
		try {
			
			String ip = "127.0.0.1" ;
			int port = 1255 ;
			
			s = new Socket(ip , port) ;
			
			din = new DataInputStream(s.getInputStream()) ;
			dout = new DataOutputStream(s.getOutputStream()) ;
			
			while(!msgin.equals("exit")) {
				msgin = din.readUTF() ;
				msg_area.setText(msg_area.getText().trim() + "\n Server : \t" + msgin); // displaying message
				
				
				
			}
			
			
					
			
			
		}
		
		catch(Exception e) {
			
			msg_area.append("\nThere is a problem with the server ?!\n") ;
		}
		
		
		
	}

	/**
	 * Create the application.
	 */
	public chat_client_part() {
		frame = new JFrame("Client");
		frame.setBounds(100, 100, 617, 467);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		msg_area = new JTextArea();
		msg_area.setBounds(30, 30, 441, 309);
		frame.getContentPane().add(msg_area);
		
		msg_field = new JTextField();
		msg_field.setBounds(30, 380, 384, 38);
		frame.getContentPane().add(msg_field);
		msg_field.setColumns(10);
		
		msg_send = new JButton("Send Message");
		msg_send.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				
				String msgout = msg_field.getText().trim();
				
				if(msgout.equals("exit")) {
					 msg_area.append("Server is disconnected ! Goodbye ...");
					 System.exit(0);
				 }
				
				else {
					
					// Putting client message in the message field 
					
					msg_area.setText(msg_area.getText().trim() + "\nClient : \t" + msgout);
					
					
					// Sending data to Server 
					 try {
						
						 
						dout.writeUTF(msgout);
						
					} catch (Exception e1) {
						
						msg_area.append("There is a problem with the server ?!" + "\n") ;
						
					}
				}
				
				
				
			}
		});
		msg_send.setBounds(459, 380, 133, 38);
		frame.getContentPane().add(msg_send);
	}

}
