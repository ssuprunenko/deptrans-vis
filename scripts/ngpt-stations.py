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



df = pd.read_csv("/home/sergey/Dropbox/Coding/d3/deptrans-vis/data/ngpt-stations-x.csv",
					sep=';', encoding='utf-8')



common_matrix = []
for okrug in df.OKRUG.unique():
	df_okrug = df[df.OKRUG == okrug]
	data = []
	for district in df_okrug.UPRAVA.unique():
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

to_json(common_matrix, 'matrix-districts')

uniq_okrugs = [u"САО", u"СВАО", u"ВАО", u"ЮВАО", u"ЮАО", u"ЮЗАО", u"ЗАО", u"СЗАО", u"ЦАО"]
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

"""
ВАО
ЗАО
ЗелАО
МО
САО
СВАО
СЗАО
ТАО
ЦАО
ЮАО
ЮВАО
ЮЗАО
"""