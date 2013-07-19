#!/usr/bin/python
# -*- coding:utf-8 -*-"
import pandas as pd
from collections import OrderedDict
from json import dump

# Настройка отображения
pd.set_option('max_columns', 20)
pd.set_option('max_rows', 50)
pd.set_option('line_width', 600)
pd.set_option('max_colwidth', 100)
pd.set_option('notebook_repr_html', False)


def get_unique_elements(series):
	"""
	Extraction lists in elements in Series
	Removing duplicates from elements in Series
	Sorting lists and return them
	[IN]  pd.Series
	[OUT] list
	"""
	a = []
	for item in series.tolist():
		item = item.split()
		a.append(item[0]) if (len(item) == 1) else [a.append(item[i]) for i in xrange(len(item))]
	return sorted(list(set(a)))


def get_common_elements(dict1, dict2):
	"""
	Convert dicts to lists
	Return common elements from input dicts
	[IN]  dict, dict
	[OUT] list
	"""
	list1 = list(dict1)[0]
	list2 = list(dict2)[0]
	return sorted(set(list1).intersection(list2))


def to_json(df, filename):
    d = [
    OrderedDict([
    	(colname, row[i])
    	for i,colname in enumerate(df.columns)
    	])
    for row in df.values
    ]
    return dump(d, open(filename + '.json', 'w'))



df = pd.read_csv("/home/sergey/Dropbox/Coding/d3/ssuprunenko.github.io/data/ngpt-stations.csv",
					sep=';', encoding='utf-8')

# u"САО", u"СВАО",
uniq_okrugs = [u"СВАО", u"ВАО", u"ЦАО", u"ЮВАО", u"ЮАО", u"ЮЗАО", u"ЗАО", u"СЗАО", u"САО"]

# common_matrix = []
# for okrug in uniq_okrugs:
# 	df_okrug = df[df.OKRUG == okrug]
# 	data = []
# 	for district in df_okrug.UPRAVA.unique():
# 		routes = ({'okrug': okrug, 'district':district,
# 				 'routes':get_unique_elements(df[df.UPRAVA == district].ROUTES)})
# 		data.append(routes)
# 	data = pd.DataFrame(data, columns=['okrug', 'district', 'routes'])

# 	local_matrix = []
# 	for parent_district in data.district:
# 		for district in data.district:
# 			routes = len(get_common_elements(data[data.district == parent_district].routes,
# 						 data[data.district == district].routes))
# 			local_matrix.append(routes)
# 		common_matrix.append({'okrug': okrug, 'district': parent_district,
# 							 'routes': local_matrix})
# 		local_matrix = []

# common_matrix = pd.DataFrame(common_matrix, columns=['okrug', 'district', 'routes'])

# to_json(common_matrix, 'matrix-districts')

districts = (
	{
	u"САО": [(u"Восточное Дегунино",9), (u"Дмитровский",0), (u"Бескудниковский",0),
			 (u"Тимирязевский",9), (u"Аэропорт",2), (u"Савеловский",9), (u"Беговой",2),
			 (u"Хорошевский",7), (u"Сокол",2), (u"Войковский",2), (u"Коптево",2),
			 (u"Головинский",2), (u"Ховрино",2), (u"Левобережный",2), (u"Западное Дегунино",2),
			 (u"Молжаниновский",0),
			 (u"",0)],

	u"СВАО":[(u"Северное Медведково",6), (u"Южное Медведково",6), (u"Лосиноостровский",6),
			 (u"Бабушкинский",6), (u"Ярославский",6), (u"Свиблово",6), (u"Ростокино",13),
			 (u"Алексеевский",6), (u"Марьина роща",10), (u"Останкинский",13), (u"Бутырский",9),
			 (u"Марфино",13), (u"Отрадное",9), (u"Алтуфьевский",9), (u"Бибирево",9),
			 (u"Лианозово",9), (u"Северный",0)],

	u"ВАО": [(u"Северное Измайлово",3), (u"Восточный",0), (u"Измайлово",3), (u"Восточное Измайлово",3),
			 (u"Ивановское",0), (u"Новокосино",8), (u"Косино-Ухтомский",0),
			 (u"Вешняки",7), (u"Новогиреево",8), (u"Перово",8), (u"Соколиная гора",3), (u"Сокольники",1),
			 (u"Богородское",1), (u"Преображенское",1), (u"Метрогородок",0), (u"Гольяново",3),
			 (u"",0)],

	u"ЦАО": [(u"Мещанский",10), (u"Красносельский",1), (u"Басманный",3), (u"Таганский",7),
			 (u"Замоскворечье",2), (u"Якиманка",6), (u"Хамовники",1), (u"Арбат",4),
			 (u"Пресненский",7), (u"Тверской",9),
			 (u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0)],

	u"ЮВАО":[(u"Выхино-Жулебино",7), (u"Рязанский",7), (u"Капотня",0), (u"Братеево",2),
			 (u"Некрасовка",0), (u"Марьино",10), (u"Люблино",10), (u"Текстильщики",7),
			 (u"Кузьминки",7), (u"Нижегородский",7), (u"Лефортово",8), (u"Южнопортовый",7),
			 (u"",0),(u"",0),(u"",0),(u"",0),(u"",0)],

	u"ЮАО": [(u"Нагатинский затон",2), (u"Даниловский",2), (u"Москворечье-Сабурово",2), (u"Царицыно",2),
			 (u"Орехово-Борисово Северное",2), (u"Зябликово",10), (u"Орехово-Борисово Южное",2),
			 (u"Братеево",2), (u"Бирюлево Восточное",0), (u"Бирюлево Западное",9), (u"Чертаново Южное",9),
			 (u"Чертаново Центральное",9), (u"Чертаново Северное",9), (u"Нагорный",9),
			 (u"Донской",9), (u"Нагатино-Садовники",2),
			 (u"",0)],

	u"ЮЗАО":[(u"Гагаринский",1), (u"Академический",6), (u"Котловка",9), (u"Зюзино",11),
		     (u"Северное Бутово",12), (u"Южное Бутово",12), (u"Ясенево",6), (u"Теплый Стан",6),
		     (u"Обручевский",6), (u"Коньково",6), (u"Черемушки",6), (u"Ломоносовский",1),
		     (u"",0),(u"",0),(u"",0),(u"",0),(u"",0)],

	u"ЗАО": [(u"Филевский парк",4), (u"Крылатское",3), (u"Дорогомилово",4), (u"Раменки",1),
		     (u"Проспект Вернадского",1), (u"Внуково",0), (u"Ново-Переделкино",0),
		     (u"Тропарево-Никулино",1), (u"Очаково-Матвеевское",0), (u"Солнцево",0),
		     (u"Кунцево",3), (u"Можайский",3), (u"Фили-Давыдково",4),
		     (u"",0),(u"",0),(u"",0),(u"",0)],

	u"СЗАО":[(u"Куркино",0), (u"Северное Тушино",7), (u"Южное Тушино",7), (u"Покровское-Стрешнево",7),
			 (u"Хорошево-Мневники",7), (u"Щукино",7), (u"Строгино",3), (u"Митино",3),
			 (u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0)]
	})

common_matrix = []
data = []
for okrug in uniq_okrugs:
	for district in districts[okrug]:
		routes = ({'okrug': okrug, 'district':district[0],
				 'routes':get_unique_elements(df[df.UPRAVA == district[0]].ROUTES),
				 'metro':district[1]})
		data.append(routes)

data = pd.DataFrame(data, columns=['okrug', 'district', 'routes', 'metro'])

to_json(data, '../data/districts')

for okrug in uniq_okrugs:
	local_matrix = []
	for parent_district in data[data.okrug == okrug].district:
		for district in data[data.okrug == okrug].district:
			routes = len(get_common_elements(data[data.district == parent_district].routes,
						 data[data.district == district].routes))
			local_matrix.append(routes)
		common_matrix.append({'okrug': okrug, 'district': parent_district,
							 'routes': local_matrix,
						  	   'metro': data[data.district == parent_district].metro.values[0]})
		local_matrix = []

common_matrix = pd.DataFrame(common_matrix, columns=['okrug', 'district', 'routes', 'metro'])

to_json(common_matrix, '../data/matrix')


uniq_okrugs = ([u"СВАО", u"ВАО", u"ЦАО", u"ЮВАО", u"ЮАО", u"ЮЗАО", u"ЗАО", u"СЗАО", u"САО",
			  (u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0),(u"",0)])
common_matrix_okr = []
data_okr = []
for okrug in uniq_okrugs:
	routes = ({'okrug': okrug, 'routes':get_unique_elements(df[df.OKRUG == okrug].ROUTES)})
	data_okr.append(routes)
data_okr = pd.DataFrame(data_okr, columns=['okrug', 'routes'])

local_matrix = []
for parent_okrug in data_okr.okrug:
	for okrug in data_okr.okrug:
		routes = len(get_common_elements(data_okr[data_okr.okrug == parent_okrug].routes,
						 data_okr[data_okr.okrug == okrug].routes))
		local_matrix.append(routes)
	common_matrix_okr.append({'okrug': parent_okrug, 'routes': local_matrix})
	local_matrix = []

common_matrix_okr = pd.DataFrame(common_matrix_okr, columns=['okrug', 'routes'])

to_json(common_matrix_okr, '../data/okrugs')