import csv
import random
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.popup import Popup
# from kivy.core.window import Window

# from kivy.uix.gridlayout import GridLayout
# from kivy.uix.button import Button
from kivy.uix.widget import Widget
# from kivy.graphics import Rectangle, Color

# from kivy.uix.boxlayout import BoxLayout
# from kivy.uix.scrollview import ScrollView
# from kivy.base import EventLoop


### PROGRAM LOGIC ###
# READ CSV FILE
def read_csv_file():
	with open("straindata.csv") as file:
		reader = csv.reader(file)
		next(reader, None)
		i = 0
		data = []
		for i, row in enumerate(reader):
			if i<30:
				data.append(row)
			else:
				break
	return data

all_data = read_csv_file()
data = all_data

class Strain:
	def __init__(self, name, parents, genetics, thc, cbd, flavor, effect):
		self.name = name
		self.parents = parents
		self.genetics = genetics
		self.thc = thc
		self.cbd = cbd
		self.flavor = flavor
		self.effect = effect

def remove_strain(strain_index, data=data):
	return data.pop(strain_index)

def select_question_and_answers(data=data):
	total_wrong_answers = 3
	answers = []
	ind = random.randint(0, len(data)-1)
	q = data[ind]
	strain = Strain(q[0], q[1], q[2], q[3], q[4], q[5], q[6])
	question = strain.name
	answer = strain.parents
	# answers.append(answer)

	data = remove_strain(ind)

	while len(answers) < total_wrong_answers:
		wrong_parent = random.choice(all_data)[1]
		if wrong_parent not in answers:
			answers.append(wrong_parent)
	# random.shuffle(answers)
	# print("Name: "+strain.name+"\n", "Parents: "+strain.parents+"\n", "Answers: "+str(answers)+"\n")
	return data, question, answer, answers
# select_question_and_answers()


### KIVY LAYOUT ###
# class CanvasWidget(Widget):
# 	def __init__(self, **kwargs):
# 		super(CanvasWidget, self).__init__(**kwargs) 
# 		with self.canvas:
# 			Color(.234, .456, .678, .8)
# 			self.rect = Rectangle(pos = self.center,
#                                   size =(self.width / 2.,
#                                         self.height / 2.))
#             # Update the canvas as the screen size change
# 			self.bind(pos = self.update_rect,
#                   size = self.update_rect)
# 	def update_rect(self, *args):
# 		self.rect.pos = self.pos
# 		self.rect.size = self.size





class QuestionWindow(Widget):

	def __init__(self, data=data):
		super().__init__()
		# self.name = name
		# self.category = category
		# self.level = level
		# self.list = QuestionList(self.category)
		# self.question = selectQuestion(self.list,self.level)
		self.data, self.question, self.answer, self.answers = select_question_and_answers()

	def if_question_incorrect(self):
		popup = Popup(title='Information',content=Label(text=f'You are wrong :(\n\n   score  :  {self.scoreLabel.text}'),
                      size_hint=(None,None),
                      size=(500,500),
                      pos_hint={'x': 550.0 / self.width,
                                'y': 300.0 / self.height},
                      )
		popup.open()
		# manager.current = 'main'

	def if_question_correct(self):
		popup = Popup(title='Information', content=Label(text='Correct'),
                      size_hint=(None, None),
                      size=(500, 500),
                      pos_hint={'x': 550.0 / self.width,
                                'y': 300.0 / self.height},
                      )
		popup.open()
		self.button1.text = ''
		self.button2.text = ''
		self.button3.text = ''
		self.button4.text = ''
		self.questionLabel.text = ''
		self.scoreLabel.text = str(int(self.scoreLabel.text) + 10)
		self.question.isAsk = True
		print('Correct answer : ',self.question.correct_answer)
		self.data, self.question, self.answer, self.answers = select_question_and_answers()
		# self.question = selectQuestion(self.list, self.level)
		self.button_action()


	def button1_action(self):
		if self.button1.text == self.answer:
			self.if_question_correct()
		else:
			self.if_question_incorrect()

	def button2_action(self):
		if self.button2.text == self.answer:
			self.if_question_correct()
		else:
			self.if_question_incorrect()

	def button3_action(self):
		if self.button3.text == self.answer:
			self.if_question_correct()
		else:
			self.if_question_incorrect()

	def button4_action(self):
		if self.button4.text == self.answer:
			self.if_question_correct()
		else:
			self.if_question_incorrect()


	def button_action(self):

		correct = randint(1,4)
		self.questionLabel.text = self.question

		if correct == 1:
			# self.button1.text = self.question.correct_answer
			self.button2.text = self.answer
		elif correct == 2:
			self.button2.text = self.answer
		elif correct == 3:
			self.button3.text = self.answer
		elif correct == 4:
			self.button4.text = self.answer

		for incorrect in self.answers:
			if self.button1.text == '':
				self.button1.text = incorrect
			elif self.button2.text == '':
				self.button2.text = incorrect
			elif self.button3.text == '':
				self.button3.text = incorrect
			elif self.button4.text == '':
				self.button4.text = incorrect


class QuizApp(App):
	def build(self):
        # Set window title
		# Window.title = "Cannabis Strain Quiz App"
		# return CanvasWidget()
		return QuestionWindow()

if __name__ == '__main__':
	QuizApp().run()
