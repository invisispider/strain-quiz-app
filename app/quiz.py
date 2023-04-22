import csv
import random
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.popup import Popup
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout

# @TODO better transitions?
# @TODO build
# @TODO test on phone
# @TODO give to Adam to try
# @TODO edit the markdown and push final to github
# @TODO see if it's possible to make a Pages demo

def read_csv_file():
	with open("straindata.csv") as file:
		reader = csv.reader(file)
		next(reader, None)
		i = 0
		data = []
		for i, row in enumerate(reader):
			data.append(row)
	return data

all_data = read_csv_file()
data = all_data
max_label = len(all_data)

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
	question_info = strain
	answer = strain.parents

	data = remove_strain(ind)

	while len(answers) < total_wrong_answers:
		wrong_parent = random.choice(all_data)[1]
		if wrong_parent not in answers:
			answers.append(wrong_parent)

	return data, question, question_info, answer, answers

class QuestionWindow(GridLayout):

	def __init__(self, data=data):
		super().__init__()
		self.data, self.question, self.question_info, self.answer, self.answers = select_question_and_answers()
		# self.play_to = 30
		self.play_to = 4
		self.max_label = self.play_to
		self.remaining = self.play_to
		self.score = 0
		self.scoreLabel.text = str(0) + " / " + str(self.max_label)

		self.button_action()

	def if_question_incorrect(self):
		popup = Popup(title='Information',content=Label(text=f'Incorrect\n\nStrain: {self.question}\n\nParents: {self.answer}\n\nscore  :  {self.scoreLabel.text}'),
                      size_hint=(None,None),
                      size=(500,500))

		popup.open()
		self.button1.text = ''
		self.button2.text = ''
		self.button3.text = ''
		self.button4.text = ''
		self.questionLabel.text = ''
		self.scoreLabel.text = str(int(self.score)) + " / " + str(self.max_label)
		self.data, self.question, self.question_info, self.answer, self.answers = select_question_and_answers()
		self.button_action()

	def if_question_correct(self):
		popup = Popup(title='Information', content=Label(text=f'Correct\n\nStrain: {self.question}\n\nParents: {self.answer}\n\nscore  :  {str(int(self.score)+1)+" / "+str(self.max_label)}'),
                      size_hint=(None, None),
                      size=(500, 500))

		popup.open()
		self.button1.text = ''
		self.button2.text = ''
		self.button3.text = ''
		self.button4.text = ''
		self.questionLabel.text = ''
		self.score += 1
		self.scoreLabel.text = str(int(self.score)) + " / " + str(self.max_label)
		self.data, self.question, self.question_info, self.answer, self.answers = select_question_and_answers()
		self.button_action()

	def kill_screen(self):
		computation = round(100*int(self.score)/int(self.max_label))
		grade = self.compute_grade(computation)
		popup = Popup(title='Kill Screen', size_hint=(None, None), size=(500, 500))
		content = BoxLayout(orientation='vertical', spacing=10, padding=10)
		content.add_widget(Label(text=f'Final Score: {str(self.score)} / {str(self.max_label)}\n\nPercentile: {computation}% {grade}'))
		content.add_widget(Button(text='Close', on_press=self.terminate_app))
		popup.content = content
		popup.open()

	def terminate_app(self, *args):
		App.get_running_app().stop()

	def compute_grade(self, p):
		if p==100:
			return "A+ Perfect score! Holy canna-shit!"
		elif p>=90:
			return "A Almost perfect."
		elif p>=80:
			return "B You are quite bueno."
		elif p>=70:
			return "C Good job. Keep playing."
		elif p>=60:
			return "D Still, not half bad...."
		elif p<60:
			return "You are garbage. Keep playing!"

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
		self.remaining -= 1
		self.remainingLabel.text = str(self.remaining)
		if self.remaining < 0:
			self.kill_screen()

		self.strain_info_box.geneticsLabel.text = self.question_info.genetics
		self.strain_info_box.thcLabel.text = self.question_info.thc
		self.strain_info_box.cbdLabel.text = self.question_info.cbd
		if "[" in self.question_info.flavor:
			self.question_info.flavor = ', '.join(eval(self.question_info.flavor))
		self.strain_info_box.flavorLabel.text = self.question_info.flavor
		if "[" in self.question_info.effect:
			self.question_info.effect = ', '.join(eval(self.question_info.effect))
		self.strain_info_box.effectLabel.text = self.question_info.effect

		correct = random.randint(1,4)
		self.questionLabel.text = self.question
		if correct == 1:
			self.button1.text = self.answer
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
		return QuestionWindow()

if __name__ == '__main__':
	QuizApp().run()
