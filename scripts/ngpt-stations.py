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
uniq_okrugs = [u"ВАО", u"ЦАО", u"ЮВАО", u"ЮАО", u"ЮЗАО", u"ЗАО", u"СЗАО"]

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

districts = ({
	u"ВАО": [u"Северное Измайлово", u"Восточный", u"Измайлово", u"Восточное Измайлово",
			 u"Ивановское", u"Новокосино", u"Косино-Ухтомский",
			 u"Вешняки", u"Новогиреево", u"Перово", u"Соколиная гора", u"Сокольники",
			 u"Богородское", u"Преображенское", u"Метрогородок", u"Гольяново"],

	u"ЦАО": [u"Мещанский", u"Красносельский", u"Басманный", u"Таганский",
			 u"Замоскворечье", u"Якиманка", u"Хамовники", u"Арбат",
			 u"Пресненский", u"Тверской"],

	u"ЮВАО":[u"Выхино-Жулебино", u"Рязанский", u"Капотня", u"Братеево",
			 u"Некрасовка", u"Марьино", u"Люблино", u"Текстильщики",
			 u"Кузьминки", u"Нижегородский", u"Лефортово", u"Южнопортовый"],

	u"ЮАО": [u"Нагатинский затон", u"Даниловский", u"Москворечье-Сабурово", u"Царицыно",
			 u"Орехово-Борисово Северное", u"Зябликово", u"Орехово-Борисово Южное",
			 u"Братеево", u"Бирюлево Восточное", u"Бирюлево Западное", u"Чертаново Южное",
			 u"Чертаново Центральное", u"Чертаново Северное", u"Нагорный",
			 u"Донской", u"Нагатино-Садовники"],

	u"ЮЗАО":[u"Гагаринский", u"Академический", u"Котловка", u"Зюзино",
		     u"Северное Бутово", u"Южное Бутово", u"Ясенево", u"Теплый Стан",
		     u"Обручевский", u"Коньково", u"Черемушки", u"Ломоносовский"],

	u"ЗАО": [u"Филевский парк", u"Крылатское", u"Дорогомилово", u"Раменки",
		     u"Проспект Вернадского", u"Внуково", u"Ново-Переделкино",
		     u"Тропарево-Никулино", u"Очаково-Матвеевское", u"Солнцево",
		     u"Кунцево", u"Можайский", u"Фили-Давыдково"],

	u"СЗАО":[u"Куркино", u"Северное Тушино", u"Южное Тушино", u"Покровское-Стрешнево",
			 u"Хорошево-Мневники", u"Щукино", u"Строгино", u"Митино"]})

common_matrix = []
for okrug in uniq_okrugs:
	data = []
	for district in districts[okrug]:
		routes = ({'okrug': okrug, 'district':district,
				 'routes':get_unique_elements(df[df.UPRAVA == district].ROUTES)})
		data.append(routes)
	data = pd.DataFrame(data, columns=['okrug', 'district', 'routes'])

	local_matrix = []
	for parent_district in data.district:
		for district in data.district:
			routes = len(get_common_elements(data[data.district == parent_district].routes,
						 data[data.district == district].routes))
			local_matrix.append(routes)
		common_matrix.append({'okrug': okrug, 'district': parent_district,
							 'routes': local_matrix})
		local_matrix = []

common_matrix = pd.DataFrame(common_matrix, columns=['okrug', 'district', 'routes'])

to_json(common_matrix, '../data/matrix')


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